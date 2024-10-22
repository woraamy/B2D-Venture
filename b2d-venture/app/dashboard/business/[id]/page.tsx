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

export default async function BusinessPage({ params }) {
    const {id} = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Business/${id}`, { next: { tags: ['collection'] } });
    const business_json  =  await res.json();
    const business = business_json.data

    const user = await User.findById({id});

    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            {/* <div id="bar graph" className=" overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <InvestChart data={barChartdata} />
                    </div>
                </div>
            </div> */}
            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-1/2 border-b-2 ">
                <div className="relative ml-[15%] mt-10 flex"> 
                    <div className="relative h-[80px] w-[80px] rounded-full">
                    {/* <Image
                        src={investor.profile_picture || "/assets/images/profile-user.png"}
                        style={{ objectFit: "cover" }}
                        alt="Business Image"
                        fill={true}
                        className="rounded-full"
                        /> */}

                       
                    </div>
                    <div className="ml-2">
                        <h1 className="text-[32px] font-bold">{business.BusinessName}</h1>
                        {/* <span className="font-thin">{investor.name}</span>    */}
                    </div>
                </div>
                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">
                        {business.description || "No bio "}</p>
                    <Button className=" shadow hover:text-white min-w-[80%]">
                        Contact Investor
                    </Button>
                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email </td>
                            <td >{user.email || "-"}</td>
                        </tr>
                        {/* <tr>
                            <td>Tel.</td>
                            <td>{investor.contactNumber || "-"}</td>
                        </tr> */}
                    </table>
                </div>
                
            </div>
            {/* <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
                <OverviewChart chartData={pieChartdata} />
            </div>
            <div id="history" className="w-[27.5vw] flex-col  items-center h-1/2 border-r-2 overflow-auto">
                <div className="mx-5">
                    <h1 className="mt-3 text-xl font-semibold">Latest Investment</h1>
                    {investment.slice(0, 3).map((item, index)=>(
                        <InvestHistoryCard 
                        key = {index}
                        businessName={item.raise_campaign_id.business_id.BusinessName}
                        businessImg={item.raise_campaign_id.business_id.profile}
                        link={item.raise_campaign_id._id.toString()}
                        valuation={item.raise_campaign_id.business_id.valuation.toLocaleString()}
                        raised={item.amount.toLocaleString()}
                        equityStake={((item.amount/item.raise_campaign_id.raised)*100).toFixed(2).toLocaleString()}
                        shared={(item.amount/item.raise_campaign_id.shared_price).toFixed(2).toLocaleString()}
                        date={item.created_at}
                        className="relative py-2"
                        />
                    ))}
                      
                </div>
            </div>
            <div id="requestStatus" className="w-[30vw] h-1/2 overflow-auto">
            <div className="ml-10">
                <h1 className="mt-3 text-xl font-semibold">Information Acess Request status</h1>
                    <div>
                    {request.slice(0, 3).map((item, index)=>(
                        <RequestStatus
                        className=""
                        key={index}
                        businessName={item.business_id.BusinessName}
                        date={item.createdAt}
                        status={item.status}
                        businessImg={item.business_id.profile}
                        />
                    ))}
                    </div>
                </div>
            </div> */}

        </div>
    </>
    );
};
