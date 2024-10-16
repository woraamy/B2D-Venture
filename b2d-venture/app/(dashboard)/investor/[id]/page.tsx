import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { OverviewChart } from "@/components/charts/overviewchart";
import InvestHistoryCard from "@/components/shared/InvestHistoryCard"
import RequestStatus from "@/components/shared/RequestStatus";
import connect from "@/lib/connectDB"
import Investment from "@/models/Investment";
import Investor from "@/models/Investor"
import mongoose from "mongoose"; 
import RaiseCampaign from "@/models/RaiseCampaign";
import Business from "@/models/Business";
import InvestorRequest from "@/models/InvestorRequest"

const chartData2 = [
        {"business":"RAD AI", "raised": 100000},
        {"business":"Pressman Film", "raised": 50000},
        {"business":"WolfPack", "raised": 200000},
        {"business":"Zephyr Aerospace", "raised": 575000},
        {"business":"The New Shop", "raised": 80000}
    ]

export default async function Page({ params }) {
    const {id} = params;
    await connect();
    const investor = await Investor.findById(id);
    const request = await InvestorRequest.find({request_status: 'pending'})
                                                .populate('business_id')
                                                .sort({createdAt: -1 })
                                                .limit(3);
    const investment = await Investment.find({'investor_id': id })
                                            .populate({
                                                path: 'raise_campaign_id',
                                                populate: {path: 'business_id'}
                                            })
                                            .sort({ created_at: -1 })
                                            .limit(3);
    
    const now = new Date();
    const twelthMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
    const { ObjectId } = mongoose.Types;
    const investorObjectId = new ObjectId(id);
    const  barChartdata = await Investment.aggregate([
        {
          $match: {
            investor_id: investorObjectId,
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


    if (!investor) {
        return <div>Investor not found</div>;
    }

    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            <div id="bar graph" className=" overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <InvestChart data={barChartdata} />
                    </div>
                </div>
            </div>
            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-1/2 border-b-2 ">
                <div className="relative ml-[15%] mt-10 flex"> 
                    <div className="relative h-[80px] w-[80px] rounded-full">
                    <Image
                        src={investor.profile_picture || "/assets/images/profile-user.png"}
                        style={{ objectFit: "cover" }}
                        alt="Business Image"
                        fill={true}
                        className="rounded-full"
                        />

                       
                    </div>
                    <div className="ml-2">
                        <h1 className="text-[32px] font-bold">{investor.firstName} {investor.lastName}</h1>
                        <span className="font-thin">{investor.name}</span>   
                    </div>
                </div>
                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">
                        {investor.investor_description || "No bio "}</p>
                    <Button className=" shadow hover:text-white min-w-[80%]">
                        Contact Investor
                    </Button>
                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email </td>
                            <td >{investor.email || "-"}</td>
                        </tr>
                        <tr>
                            <td>Tel.</td>
                            <td>{investor.contactNumber || "-"}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
                {/* <OverviewChart chartData={chartdata2} /> */}
            </div>
            <div id="history" className="w-[27.5vw] flex-col h-1/2 border-r-2 overflow-auto">
                <div className="ml-10">
                    <h1 className="mt-3 text-xl font-semibold">Latest Investment</h1>
                    {investment.map((item, index)=>(
                        
                        <InvestHistoryCard 
                        key = {index}
                        businessName={item.raise_campaign_id.business_id.BusinessName}
                        businessImg={item.raise_campaign_id.business_id.profile}
                        link={item.raise_campaign_id._id.toString()}
                        valuation={item.raise_campaign_id.business_id.valuation}
                        raised={item.amount}
                        equityStake={((item.amount/item.raise_campaign_id.raised)*100).toFixed(2)}
                        shared={(item.amount/item.raise_campaign_id.shared_price).toFixed(2)}
                        date={item.created_at.toLocaleDateString()}
                        className="relative py-2"
                        />
                    ))}
                      
                </div>
            </div>
            <div id="requestStatus" className="w-[30vw] h-1/2 overflow-auto">
            <div className="ml-10">
                <h1 className="mt-3 text-xl font-semibold">Information Acess Request status</h1>
                    <div>
                    {request.map((item, index)=>(
                        <RequestStatus
                        key={index}
                        businessName={item.business_id.BusinessName}
                        date={item.createdAt.toLocaleDateString()}
                        status={item.request_status}
                        businessImg={item.business_id.profile}
                        link={item.business_id._id.toString()}
                        />
                    ))}
                    </div>
                </div>
            </div>

        </div>
    </>
    );
};