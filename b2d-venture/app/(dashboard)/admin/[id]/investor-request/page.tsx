import BusinessRequest from "@/models/businessRequest";
import InvestorRequest from "@/models/InvestorRequest"
import Investor from '@/models/Investor'
import Business from '@/models/Business'
import BusinessRequestCard from "@/components/shared/BusinessRequestCard";
import InvestorRequestCard from "@/components/shared/InvestorRequestCard";
import SearchBar from "@/components/ui/searchbar";
import Filter from "@/components/ui/filter";

export default async function Page({ params }) {
    const {id} = params;
    const investor = await Investor.find()
    const business = await Business.find()
    const cur = await InvestorRequest.find({request_status: 'pending'}).populate('investor_id').populate('business_id').sort({createdAt: -1 })
    const history = await InvestorRequest.find({status: ['approved','done','rejected']}).populate('investor_id').populate('business_id').sort({createdAt: -1 })
    return(
        <div>
            <div className="ml-[10%] mt-[5%] w-[85vw]">
                <h1 className="text-5xl font-bold">Business request</h1>
                <h1 className="text-3xl mt-5">Current Request</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5">
                        <SearchBar text="Search Business"/>
                        <Filter className="ms-5"/>
                    </div>
                    <div className="flex px-5 py-5 mt-5  flex-wrap gap-4">
                        {cur.map((req)=>(
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
                <h1 className="text-3xl mt-5">Request History</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5">
                        <SearchBar text="Search Business"/>
                        <Filter className="ms-5"/>
                    </div>
                    <div className="flex px-5 py-5 mt-5  flex-wrap gap-4">
                        {history.map((req)=>(
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

)}