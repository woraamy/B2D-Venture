import ReportCard from "@/components/shared/ReportCard";
import connect from "@/lib/connectDB";
import User from "@/models/user"
import RaiseCampaign from "@/models/RaiseCampaign";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import BusinessRequestCard from "@/components/shared/AdminDashboard/BusinessRequestCard";
import InvestorRequestCard from "@/components/shared/AdminDashboard/InvestorRequestCard";
import BusinessRequest from "@/models/businessRequest";
import InvestorRequest from "@/models/InvestorRequest"
import Investor from '@/models/Investor'
import Business from '@/models/Business'
import Investment from '@/models/Investment'
import { AdminChart } from "@/components/charts/AdminChart";

export default async function Page() {
    await connect();
    const businessRequest = await BusinessRequest.find({status: 'pending'}).sort({createdAt: -1 })
    const investorRequest = await InvestorRequest.find({status_from_admin: 'pending'}).populate('investor_id').populate('business_id').sort({createdAt: -1 })
    const activeInvestor = await User.countDocuments({role:'investor'})
    const activeBusiness = await User.countDocuments({role:'business'})
    const activeCampaign = await RaiseCampaign.countDocuments()
    const [totalRaised] = await RaiseCampaign.aggregate(
        [{
            $group:{
                _id: null,
                total: {
                    $sum: "$raised"}
            }
        }]
    )
    const [profit] = await Investment.aggregate(
        [{
            $group:{
                _id: null,
                total: {
                    $sum: "$fee"}
            }
        }]
    )
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    const chartData = await Investment.aggregate([
        {
          $match: {
            created_at: { $gte: sixMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$created_at" },
              month: { $month: "$created_at" }
            },
            raised: { $sum: "$amount" },
            profit: { $sum: "$fee"}
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);

    return(
        <>
        <div className="flex-wrap w-[85vw] h-[100%]">
            <div className="flex-col ml-10 mt-5">
                <h1 className="text-[32px] font-bold ml-5">Dashboard</h1>      
                    <div className="flex ml-3">
                        <ReportCard className="" name='Active Investor' amount={activeInvestor.toLocaleString()}/>
                        <ReportCard className="" name='Active Business' amount={activeBusiness.toLocaleString()}/>
                        <ReportCard className="" name='Active Raise Campaign' amount={activeCampaign.toLocaleString()}/>
                        <ReportCard className="" name='Total Raised' amount={totalRaised.total.toLocaleString()}/>
                        <ReportCard className="" name='Total Profit' amount={profit.total.toLocaleString()}/>
                    </div>
                <div className="px-2">
                    <div className="ml-3 w-[75vw] rounded-md shadow-md overflow-hidden">
                        <AdminChart 
                            className=""
                            data={chartData}/>
                    </div>
                </div>
                <div className="ml-5 mb-10 flex ">
                    <div className="mt-5 px-2 border-r-2 border-t-4">
                        <h1 className="text-2xl mt-5 font-bold ">Business request</h1>
                        <div className="flex overflow-auto items-center px-2 w-[37vw] mt-5">
                            {businessRequest.map((req)=>(
                                <BusinessRequestCard 
                                key={req._id}
                                id={req._id.toString()}
                                contact={req.contactNumber}
                                address={req.BusinessAddress + " " + req.stateProvince + " " + req.city + " " + req.country +  " " + req.postalCode}  
                                name={req.BusinessName} 
                                description={req.description}
                                tag={req.tag_list} 
                                email={req.email}
                                status={req.status}
                                className='mr-5 mb-10'
                                time={req.createdAt.toLocaleDateString('en-GB')}
                                />
                            ))}
                        </div>    
                    </div>
                    <div className=" mt-5 px-5 border-l-2 border-t-4">
                        <h1 className="text-2xl mt-5 font-bold">Investor request</h1>    
                        <div className="flex overflow-auto items-center px-2 w-[37vw] mt-5">
                            {investorRequest.map((req)=>(
                                <InvestorRequestCard
                                key={req.id} 
                                id={req._id.toString()}
                                contact={req.investor_id.contactNumber} 
                                name={req.investor_id.firstName + " " + req.investor_id.lastName}  
                                description={req.investor_id.investor_description}  
                                email={req.investor_id.email}
                                business={req.business_id.BusinessName}
                                reason={req.reason}
                                status_from_admin={req.status_from_admin}
                                className='mr-5 mb-10'
                                profile={req.investor_id.profile_picture}
                                time={req.createdAt.toLocaleDateString('en-GB')}
                                />
                            ))}
                        </div>    
                    </div>
                
                </div>
                   
            </div>
        </div>
    </>
    );
};