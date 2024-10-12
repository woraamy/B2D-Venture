import BusinessRequest from "@/models/businessRequest";
import InvestorRequest from "@/models/InvestorRequest"
import Investor from '@/models/Investor'
import Business from '@/models/Business'
import BusinessRequestCard from "@/components/shared/BusinessRequestCard";
import InvestorRequestCard from "@/components/shared/InvestorRequestCard";

export default async function Page({ params }) {
    const {id} = params;
    const investor = await Investor.find()
    const business = await Business.find()
    const businessRequest = await BusinessRequest.find({status: 'pending'}).sort({createdAt: -1 })
    const investorRequest = await InvestorRequest.find({request_status: 'pending'}).populate('investor_id').populate('business_id').sort({createdAt: -1 })
    return(
        <div>
            <div>
                <h1 className="text-[32px] mt-5 font-bold ">Business request</h1>
                <div className="flex px-5 py-5 ">
                    {businessRequest.map((req)=>(
                        <BusinessRequestCard 
                        key={req._id}
                        contact={req.contactNumber}
                        address={req.BusinessAddress + " " + req.stateProvince + " " + req.city + " " + req.country +  " " + req.postalCode}  
                        name={req.BusinessName} 
                        description={req.description}
                        tag={req.typeOfBusiness} 
                        email={req.email}
                        className='mr-5'
                        />
                    ))}
                </div>    
            </div>
            <div className="ml-7">
                <h1 className="text-[32px] mt-5 font-bold">Business request</h1>    
                <div className="flex px-5 py-5 ">
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
                        className='mr-5'
                        />
                    ))}
                </div>    
            </div>
        </div>
    );
}