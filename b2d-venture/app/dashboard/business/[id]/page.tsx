// import business from '@/models/Business';
import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import Image from "next/image";
import Tag from "@/components/ui/tag";
import connect from "@/lib/connectDB"
import Investment from "@/models/Investment";
import mongoose from "mongoose"; 
import React from "react";
import User from "@/models/user";
import { BusinessChart } from "@/components/charts/BusinessChart";
import ReportCard from "@/components/shared/ReportCard";
import InvestorRequestCard from "@/components/shared/BusinessDashboard/InvestorRequestCard";
import InvestorRequest from "@/models/InvestorRequest";
import Business from "@/models/Business";

async function getBarChartData(raiseCampaignIds){
    await connect();
    const now = new Date();
    const twelthMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
    // console.log(raiseCampaignObjectId);
    const  barChartdata = await Investment.aggregate([
        {
          $match: {
            raise_campaign_id: { $in: raiseCampaignIds },
            created_at: { $gte: twelthMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$created_at" },
              month: { $month: "$created_at" }
            },
            raised: { $sum: "$amount" }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);
    return {barChartdata}
}

async function getBusinessData(raiseCampaignIds) {
    const totalInvestor = await Investment.aggregate([
      { $match: { raise_campaign_id: { $in: raiseCampaignIds }  } },
      { $group: { _id: "$investor_id" } },  // Unique investors
      { $count: "totalInvestor" }
    ]);
  
    // Total investments (count of investments)
    const totalInvestment = await Investment.countDocuments({
        raise_campaign_id:  { $in: raiseCampaignIds } ,
    });
  
    // Total raised (sum of amounts raised)
    const totalRaised = await Investment.aggregate([
      { $match: { raise_campaign_id:  { $in: raiseCampaignIds } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
  
    return {
      totalInvestor: totalInvestor[0]?.totalInvestor || 0,
      totalInvestment,
      totalRaised: totalRaised[0]?.total || 0,
    };
  }

  export default async function BusinessPage({ params }) {
    const { id } = params;    
    const { ObjectId } = mongoose.Types;
    const business = await Business.findById(id)

    // Fetch Investor Request data
    const investorRequests = await InvestorRequest.find({
        status_from_business: 'pending',
        business_id: business._id // Assuming `businessId` is provided
    })
    .populate('investor_id')
    .populate('business_id')
    .sort({ createdAt: -1 });
    

    //Fetch Raise Campaign data
    const response_raise_campaign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${business._id}`, {
        next: { tags: ['collection'] },
    });    
    const raise_campaign = await response_raise_campaign.json();

    let businessObjectId;
    // Make business object id
    if (ObjectId.isValid(id)) {
        businessObjectId = new ObjectId(business._id);
    } else {
        return { notFound: true };  
    }

    let raiseCampaignObjectIds
    let barChartdata
    let totalInvestor, totalInvestment, totalRaised

    try {
        const raiseCampaignObjectIds = raise_campaign.map((item) => new ObjectId( item._id))
        const { barChartdata } = await getBarChartData(raiseCampaignObjectIds);
        const { totalInvestor, totalInvestment, totalRaised } = await getBusinessData(raiseCampaignObjectIds);
     }
     catch (error) {
        const raiseCampaignObjectIds = [];
        const barChartdata = [];
        const totalInvestor = 0
        const totalInvestment = 0;
        const totalRaised = 0;
      }

    

    return(
        <>
        <div className="flex flex-wrap w-[85vw] ">
            <div id="bar graph" className="overflow-auto flex w-[54vw] h-[48vh] border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <BusinessChart data={barChartdata || []} />
                    </div>
                </div>
            </div>

            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-[48vh] border-b-2">
                <div className="relative ml-[15%] mt-10 flex"> 
                    <div className="relative h-[80px] w-[80px] rounded-full">
                    <Image
                        src={business.profile || "/assets/images/profile-user.png"}
                        style={{ objectFit: "cover" }}
                        alt="Business Image"
                        fill={true}
                        className="rounded-full"
                    />
                    </div>
                    <div className="ml-2">
                        <h1 className="text-[32px] font-bold">{business.BusinessName}</h1>
                        <h2>{business.firstName} {business.lastName}</h2>
                    </div>
                </div>

                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">
                        {business.description || "No bio"}
                    </p>

                    <table className="mt-3 text-[12px] font-light">
                    <tbody>
                        <tr>
                            <td>Tags</td>
                            <td className="flex">
                                {business.tag_list && business.tag_list.length > 0 ? (
                                    business.tag_list.map((tag, index) => (
                                        <div key={index} ><Tag tagName={tag} className="mr-2"/></div>
                                    ))
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="w-[150px] h-10">Email</td>
                            <td>{business.email || "-"}</td>
                        </tr>
                        <tr>
                            <td className="w-[150px]">Tel.</td>
                            <td>{business.contactNumber || "-"}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="flex w-full h-[50%] -mt-5">
            <div className="w-[54vw] border-r-2">
                <h1 className="text-3xl ml-10 mt-5 font-bold">Investor requests</h1>    
                <div className="flex ml-10 overflow-auto mt-5 ">
                    {investorRequests.map((req)=>(
                        <InvestorRequestCard
                        key={req.id} 
                        id={req._id.toString()}
                        contact={req.investor_id.contactNumber} 
                        name={req.investor_id.name}  
                        description={req.investor_id.investor_description}  
                        email={req.investor_id.email}
                        profile={req.investor_id.profile_picture}
                        business={req.business_id.BusinessName}
                        reason={req.reason}
                        status_from_business={req.status_from_business}
                        className='mr-5'
                        time={req.createdAt.toLocaleDateString('en-GB')}
                        />
                    ))}
                </div>    
            </div>
             {/* Report Cards Section */}
             <div className="flex flex-wrap ml-3 w-[30vw] ">
                <ReportCard className="" name='Total Investors' amount={totalInvestor}/>
                <ReportCard className="" name='Total Investments' amount={totalInvestment}/>
                <ReportCard className="" name='Total Raised' amount={totalRaised}/>
                <ReportCard className="" name='Valuation' amount={business.valuation}/>
            </div>
            </div>
        </div>
        </>
    );
};
