import ReportCard from "@/components/shared/ReportCard";
import connect from "@/lib/connectDB";
import User from "@/models/user"
import RaiseCampaign from "@/models/RaiseCampaign";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import BusinessRequestCard from "@/components/shared/BusinessRequestCard";
import InvestorRequestCard from "@/components/shared/InvestorRequestCard";
import BusinessRequest from "@/models/businessRequest";
import InvestorRequest from "@/models/InvestorRequest"
import Investor from '@/models/Investor'
import Business from '@/models/Business'
import Investment from '@/models/Investment'
import { AdminChart } from "@/components/charts/AdminChart";

export default async function Page({ params }) {
    await connect();
    const {id} = params;
    const investor = await Investor.find()
    const business = await Business.find()
    const businessRequest = await BusinessRequest.find({status: 'pending'}).sort({createdAt: -1 })
    const investorRequest = await InvestorRequest.find({request_status: 'pending'}).populate('investor_id').populate('business_id').sort({createdAt: -1 })
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
                        <ReportCard name='Active Investor' amout={activeInvestor}/>
                        <ReportCard name='Active Business' amout={activeBusiness}/>
                        <ReportCard name='Active Raise Campaign' amout={activeCampaign}/>
                        <ReportCard name='Total Raised' amout={totalRaised.total}/>
                        <ReportCard name='Total Profit' amout={profit.total}/>
                    </div>
                <div className="px-2">
                    <div className="ml-3 w-[75vw] h-[50vh] shadow-md overflow-hidden">
                        <AdminChart 
                            className=""
                            data={chartData}/>
                    </div>
                </div>
                <div className='ml-5 mb-10 flex'>
                    <div>
                        <h1 className="text-[32px] mt-5 font-bold ">Business request</h1>
                        <div className="flex overflow-auto px-5 py-5 w-[37vw] h-[42vh] mt-5 bg-white rounded-xl shadow-md">
                            {businessRequest.map((req)=>(
                                <BusinessRequestCard 
                                key={req._id}
                                contact={req.contactNumber}
                                address={req.BusinessAddress + " " + req.stateProvince + " " + req.city + " " + req.country +  " " + req.postalCode}  
                                name={req.BusinessName} 
                                description={req.description}
                                tag={req.typeOfBusiness} 
                                email={req.email}
                                status={req.status}
                                className='mr-5'
                                />
                            ))}
                        </div>    
                    </div>
                    <div className="ml-7">
                        <h1 className="text-[32px] mt-5 font-bold">Investor request</h1>    
                        <div className="flex overflow-auto px-5 py-5 w-[37vw] h-[42vh] mt-5 bg-white rounded-xl shadow-md">
                            {investorRequest.map((req)=>(
                                <InvestorRequestCard
                                key={req.id} 
                                contact={req.investor_id.contactNumber} 
                                name={req.investor_id.name}  
                                description={req.investor_id.investor_description}  
                                email={req.investor_id.email}
                                link={req.business_id.toString()}
                                business={req.business_id.BusinessName}
                                reason={req.reason}
                                status={req.request_status}
                                className='mr-5'
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