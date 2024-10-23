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
import InvestorRequestCard from "@/components/shared/AdminDashboard/InvestorRequestCard";

async function getBarChartData({businessObjectId}){
    await connect();
    const now = new Date();
    const twelthMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
    const  barChartdata = await Investment.aggregate([
        {
          $match: {
            business_id: businessObjectId,
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

// Aggregation logic for total investors, total investments, and total raised
async function getBusinessData(businessObjectId) {
    // Total investors (unique investor count)
    const totalInvestor = await Investment.aggregate([
      { $match: { business_id: businessObjectId } },
      { $group: { _id: "$investor_id" } },  // Unique investors
      { $count: "totalInvestor" }
    ]);
  
    // Total investments (count of investments)
    const totalInvestment = await Investment.countDocuments({
      business_id: businessObjectId,
    });
  
    // Total raised (sum of amounts raised)
    const totalRaised = await Investment.aggregate([
      { $match: { business_id: businessObjectId } },
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
    
    // Ensure a valid ObjectId is used
    const { ObjectId } = mongoose.Types;
    let businessObjectId;
    
    // Validate if `id` is a valid ObjectId
    if (ObjectId.isValid(id)) {
        businessObjectId = new ObjectId(id);
    } else {
        // Handle invalid ObjectId (e.g., return 404 or some error)
        return { notFound: true };  // You can change this based on how you handle errors
    }
    
    await connect();  // Ensure DB connection

    // Fetching business data from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Business/${id}`, {
        next: { tags: ['collection'] },
    });
    const business_json = await res.json();
    const business = business_json.data;

    // Find user by businessObjectId
    const user = await User.findById(businessObjectId);  // Correctly passing ObjectId here
    
    // Proceed to fetch barChartData and businessData
    const { barChartdata } = await getBarChartData({ businessObjectId });
    const { totalInvestor, totalInvestment, totalRaised } = await getBusinessData(businessObjectId);

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
                <ReportCard className="" name='Total Investments Count' amount={totalInvestment}/>
                <ReportCard className="" name='Total Raised' amount={totalRaised}/>
            </div>

            {/* Investor Requests Section (moved below Report Cards) */}
            <div className="ml-7 w-full">
                <h1 className="text-[32px] mt-5 font-bold">Investor requests</h1>    
                <div className="flex overflow-auto px-5 py-5 w-[85%] h-[42vh] mt-5 bg-white rounded-xl shadow-md">
                    {/* {investorRequest.map((req)=>(
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
                        status={req.status}
                        className='mr-5'
                        />
                    ))} */}
                </div>    
            </div>
        </div>
        </>
    );
};
