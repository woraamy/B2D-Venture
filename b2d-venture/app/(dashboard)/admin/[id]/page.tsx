import { Button } from "@/components/ui/button";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import ReportCard from "@/components/shared/ReportCard";
import connect from "@/lib/connectDB";
import User from "@/models/user"
import RaiseCampaign from "@/models/RaiseCampaign";

export default async function Page({ params }) {
    await connect();
    const {id} = params;

    const activeInvestor = await User.countDocuments({role:'investor'})
    const activeBusiness = await User.countDocuments({role:'business'})
    const activeCampaign = await RaiseCampaign.countDocuments()
    const [totalRaised] = await RaiseCampaign.aggregate(
        [{
            $group:{
                _id: null,
                total: {
                    $sum: "$raised"
            }
            }
        }]
    )
 

    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            {/* <div id="bar graph" className="flex w-[55vw] h-1/2 border-r-2 border-b-2"> */}
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3 flex">
                    <ReportCard name='Active Investor' amout={activeInvestor}/>
                    <ReportCard name='Active Business' amout={activeBusiness}/>
                    <ReportCard name='Active Raise Campaign' amout={activeCampaign}/>
                    <ReportCard name='Total Raised' amout={totalRaised.total}/>
                    </div>
                </div>
            {/* </div> */}

        </div>
    </>
    );
};