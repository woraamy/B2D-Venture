import { Button } from "@/components/ui/button";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import ReportCard from "@/components/shared/ReportCard";
import connect from "@/lib/connectDB";
import User from "@/models/user"
import RaiseCampaign from "@/models/RaiseCampaign";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import BusinessRequestCard from "@/components/shared/BusinessRequestCard";

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
        <div className="flex-wrap w-[85vw] h-[100%]">
            <div className="flex-col ml-10 mt-5">
                <h1 className="text-[32px] font-bold ml-5">Dashboard</h1>      
                    <div className="flex ml-3">
                        <ReportCard name='Active Investor' amout={activeInvestor}/>
                        <ReportCard name='Active Business' amout={activeBusiness}/>
                        <ReportCard name='Active Raise Campaign' amout={activeCampaign}/>
                        <ReportCard name='Total Raised' amout={totalRaised.total}/>
                    </div>
                <div className="px-2">
                    <Card className="ml-3 w-[75vw] h-[50vh] shadow-md overflow-hidden">d</Card>
                </div>
                <div className='ml-5 mb-10 flex'>
                    <div>
                        <h1 className="text-[32px] mt-5 font-bold ">Business request</h1>
                        <div className="flex px-5 py-3 w-[37vw] h-[40vh] mt-5 bg-white rounded-xl shadow-md">
                            <BusinessRequestCard 
                                contact="0123456789" 
                                address="sdasdwaasdasdsadsadsadasdsad"
                                name="AI" 
                                description="asdasdasdsadsadasdsadowpqe uhfekfweori[wprmqpeumqwnxw9e90q3yr3urhc" 
                                tag={["ass,asdasd,sda"]} 
                                email="test.test@gmail.com"
                                />
                        </div>    
                    </div>
                    <div className="ml-7">
                        <h1 className="text-[32px] mt-5 font-bold">Business request</h1>    
                        <div className="flex w-[37vw] h-[40vh] mt-5 bg-white rounded-xl shadow-md"></div>    
                    </div>
                
                </div>
                   
            </div>
        </div>
    </>
    );
};