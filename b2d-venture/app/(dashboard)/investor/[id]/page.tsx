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

// async function fetchInvestorData(id){
//     const filePath = process.cwd() + '/public/data/investor.json';
//     const file = await fs.readFile(filePath);
//     const data = JSON.parse(file);

//     // Find the investor by ID
//     return data.find((entry) => entry.id === parseInt(id, 10));

// }
const chartData1 = [
        { "month": "January", "invest": 186},
        { "month": "February", "invest": 305 },
        { "month": "March","invest": 237},
        { "month": "April", "invest": 73 },
        { "month": "May", "invest": 20},
        { "month": "June", "invest": 0},
        { "month": "July", "invest": 214},
        { "month": "August", "invest": 0},
        { "month": "September", "invest": 150},
        { "month": "October", "invest": 192},
        { "month": "November", "invest": 50},
        { "month": "December", "invest": 10}
      ]
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

      console.log(barChartdata)

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
            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-1/2 border-b-2">
                <div className="relative ml-[15%] mt-10 flex"> 
                    <div className="relative h-[80px] w-[80px]">
                        <Image
                        src="/assets/images/profile-user.png"
                        style={{objectFit:"cover"}}
                        alt="Business Image" 
                        fill={true}
                        />
                    </div>
                    <div className="ml-2">
                        <h1 className="text-[32px] font-bold">{investor.name} {investor.lastname}</h1>
                        <span className="font-thin">{investor.username}</span>   
                    </div>
                </div>
                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">{investor.bio}</p>
                    <Button className=" shadow hover:text-white min-w-[80%]">
                        Contact Investor
                    </Button>
                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email </td>
                            <td >{investor.email}</td>
                        </tr>
                        <tr>
                            <td>Tel.</td>
                            <td>{investor.contactNumber}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
                {/* <OverviewChart chartData={chartdata2} /> */}
            </div>
            <div id="history" className="w-[27.5vw] flex-col h-1/2 border-r-2 overflow-auto">
                <div className="ml-10 overflow-auto">
                    <h1 className="mt-3 text-xl font-semibold">Latest Investment</h1>
                    <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                        <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                        <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                </div>
            </div>
            <div id="requestStatus" className="w-[30vw] h-1/2">
            <div className="ml-16">
                <h1 className="mt-3 text-xl font-semibold">Information Acess Request status</h1>
                    <div>
                        <RequestStatus
                        businessName="LEXI"
                        date="1/8/2024"
                        status="approve"
                        businessImg="/assets/images/businessprofile/p8.png"
                        link="1" 
                        />
                    </div>
                    <div>
                        <RequestStatus
                        businessName="LEXI"
                        date="1/8/2024"
                        status="rejected"
                        businessImg="/assets/images/businessprofile/p10.png"
                        link="1" 
                        />
                    </div>
                </div>
            </div>

        </div>
    </>
    );
};