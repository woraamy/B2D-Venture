import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import Image from "next/image";
import { OverviewChart } from "@/components/charts/overviewchart";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard"
import RequestStatus from "@/components/shared/InvestorDashboard/RequestStatus";
import connect from "@/lib/connectDB"
import Investment from "@/models/Investment";
import mongoose from "mongoose"; 

async function getBarChartData({investorObjectId}){
    await connect();
    const now = new Date();
    const twelthMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
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
    return {barChartdata}
}

function getPieChartData(data) {
    const totalRaised = data.reduce((total, cur) => {
        const business = cur.raise_campaign_id.business_id._id;
        const name = cur.raise_campaign_id.business_id.BusinessName;
        const amount = cur.amount;

        if (!total[business]) {
            total[business] = {
                business: name,
                raised: 0,
            };
        }
        total[business].raised += amount;   
        return total;

    }, {});

    const chartData = Object.values(totalRaised);
    const pieData = chartData.map((item, index) => {
        if (typeof item === 'object' && item !== null) {
            return {
                ...item,  
                fill: `var(--color-chart${index % 5 + 1})`
            };
        }
        return item;
    });
    return pieData;
}

export default async function Page({ params }) {
    const {id} = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investor/${id}`, { next: { tags: ['collection'] } });
    const investors  =  await res.json();
    const investor = investors.data

    const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/InvestorRequest/${id}/investor`, { next: { tags: ['collection'] } });
    const requestData  =  await res1.json();
    const request = requestData.data || []

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, { next: { tags: ['collection'] } });
    const investmentData  =  await res2.json();
    const investment = investmentData.data || []

    const { ObjectId } = mongoose.Types;
    const investorObjectId = new ObjectId(id);
    const {barChartdata} = await getBarChartData({investorObjectId});
    const pieChartdata = getPieChartData(investment)
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
                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email </td>
                            <td >{investor.user_id.email || "-"}</td>
                        </tr>
                        <tr>
                            <td>Tel.</td>
                            <td>{investor.contactNumber || "-"}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
                <OverviewChart chartData={pieChartdata} />
            </div>
            <div id="history" className="w-[27.5vw] flex-col  items-center h-1/2 border-r-2 overflow-auto">
                <div className="mx-5">
                    <h1 className="mt-3 text-xl font-semibold">Latest Investments</h1>
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
                <h1 className="mt-3 text-xl font-semibold">Information Access Request Status</h1>
                    <div>
                    {request.slice(0, 3).map((item, index)=>(
                        <RequestStatus
                        className=""
                        key={index}
                        businessName={item.business_id.BusinessName}
                        date={item.createdAt}
                        status={item.status_from_business}
                        businessImg={item.business_id.profile}
                        />
                    ))}
                    </div>
                </div>
            </div>

        </div>
    </>
    );
};