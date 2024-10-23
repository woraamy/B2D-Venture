// import business from '@/models/Business';
import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import Image from "next/image";
import { OverviewChart } from "@/components/charts/overviewchart";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard"
import RequestStatus from "@/components/shared/InvestorDashboard/RequestStatus";
import connect from "@/lib/connectDB"
import Investment from "@/models/Investment";
import mongoose from "mongoose"; 
import React from "react";
import User from "@/models/user";
import { BusinessChart } from "@/components/charts/BusinessChart";
import ReportCard from "@/components/shared/ReportCard";
import InvestorRequestCard from "@/components/shared/BusinessDashboard/InvestorRequestCard";
import InvestorRequest from "@/models/InvestorRequest";

async function getBarChartData({raiseCampaignObjectId}){
    await connect();
    const now = new Date();
    const twelthMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
    // console.log(raiseCampaignObjectId);
    const  barChartdata = await Investment.aggregate([
        {
          $match: {
            raise_campaign_id: raiseCampaignObjectId,
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

async function getBusinessData(raiseCampaignObjectId) {
    const totalInvestor = await Investment.aggregate([
      { $match: { raise_campaign_id: raiseCampaignObjectId } },
      { $group: { _id: "$investor_id" } },  // Unique investors
      { $count: "totalInvestor" }
    ]);
  
    // Total investments (count of investments)
    const totalInvestment = await Investment.countDocuments({
        raise_campaign_id: raiseCampaignObjectId,
    });
  
    // Total raised (sum of amounts raised)
    const totalRaised = await Investment.aggregate([
      { $match: { raise_campaign_id: raiseCampaignObjectId } },
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
    let userObjectId;
    
    if (ObjectId.isValid(id)) {
        userObjectId = new ObjectId(id);
    } else {
        return { notFound: true };  
    }
    
    await connect();  

    // Fetch business data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Business/${id}`, {
        next: { tags: ['collection'] },
    });
    const business_json = await res.json();
    const business = business_json.data;

    // Fetch Investor Request data
    const investorRequests = await InvestorRequest.find({
        status_from_business: 'pending',
        business_id: business._id // Assuming `businessId` is provided
    })
    .populate('investor_id')
    .populate('business_id')
    .sort({ createdAt: -1 });
    console.log(investorRequests);
    

    //Fetch Raise Campaign data
    const response_raise_campaign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${business._id}`, {
        next: { tags: ['collection'] },
    });    
    const raise_campaign_json = await response_raise_campaign.json();
    const raise_campaign = raise_campaign_json.data[0];

    let businessObjectId;
    // Make business object id
    if (ObjectId.isValid(id)) {
        businessObjectId = new ObjectId(business._id);
    } else {
        return { notFound: true };  
    }

    // Make raise campaign object id
    let raiseCampaignObjectId;
    if (ObjectId.isValid(id)) {
        raiseCampaignObjectId = new ObjectId(raise_campaign._id);
    } else {
        return { notFound: true };  
    }

    const user = await User.findById(userObjectId);  
    
    const { barChartdata } = await getBarChartData({ raiseCampaignObjectId });
    const { totalInvestor, totalInvestment, totalRaised } = await getBusinessData(raiseCampaignObjectId);

    return(
        <>
        <div className="flex flex-wrap w-[85vw] h-[100%]">
            <div id="bar graph" className="overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <BusinessChart data={barChartdata} />
                    </div>
                </div>
            </div>

            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-1/2 border-b-2">
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
                    </div>
                </div>

                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">
                        {business.description || "No bio"}
                    </p>

                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email</td>
                            <td>{user.email || "-"}</td>
                        </tr>
                        <tr>
                            <td>Tags</td>
                            <td>
                                {business.tag_list && business.tag_list.length > 0 ? (
                                    business.tag_list.map((tag, index) => (
                                        <div key={index}>{tag}</div>
                                    ))
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            {/* Report Cards Section */}
            <div className="flex ml-3 w-full">
                <ReportCard className="" name='Total Investors' amount={totalInvestor}/>
                <ReportCard className="" name='Total Investments' amount={totalInvestment}/>
                <ReportCard className="" name='Total Raised' amount={totalRaised}/>
            </div>

            {/* Investor Requests Section (moved below Report Cards) */}
            <div className="ml-7 w-full">
                <h1 className="text-[32px] mt-5 font-bold">Investor requests</h1>    
                <div className="flex overflow-auto px-5 py-5 w-[85%] h-[42vh] mt-5 bg-white rounded-xl shadow-md">
                    {investorRequests.map((req)=>(
                        <InvestorRequestCard
                        key={req.id} 
                        id={req._id.toString()}
                        contact={req.investor_id.contactNumber} 
                        name={req.investor_id.name}  
                        description={req.investor_id.investor_description}  
                        email={req.investor_id.email}
                        link={req.business_id.toString()}
                        business={req.business_id.BusinessName}
                        reason={req.reason}
                        status_from_business={req.status_from_business}
                        className='mr-5'
                        />
                    ))}
                </div>    
            </div>
        </div>
        </>
    );
};
