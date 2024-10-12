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
    const business = await Business.find()
    const businessRequest = await BusinessRequest.find({status: 'pending'}).sort({createdAt: -1 })
    return(
        <div>
            <div className="ml-[10%] mt-[5%] w-[85vw]">
                <h1 className="text-5xl font-bold">Business request</h1>
                <h1 className="text-3xl mt-5">Current Request</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5 w-[80%]">
                        <SearchBar text="Search Business"/>
                        <Filter className="ms-5"/>
                    </div>
                    <div className="flex px-5 py-5 mt-5 ">
                        {businessRequest.map((req)=>(
                            <BusinessRequestCard 
                            key={req._id}
                            contact={req.contactNumber}
                            address={req.BusinessAddress + " " + req.stateProvince + " " + req.city + " " + req.country +  " " + req.postalCode}  
                            name={req.BusinessName} 
                            description={req.description}
                            tag={req.typeOfBusiness} 
                            email={req.email}
                            className='mr-5\'
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
                    <div className="flex px-5 py-5 mt-5 ">
                        {businessRequest.map((req)=>(
                            <BusinessRequestCard 
                            key={req._id}
                            contact={req.contactNumber}
                            address={req.BusinessAddress + " " + req.stateProvince + " " + req.city + " " + req.country +  " " + req.postalCode}  
                            name={req.BusinessName} 
                            description={req.description}
                            tag={req.typeOfBusiness} 
                            email={req.email}
                            className='mr-5\'
                            />
                        ))}
                    </div> 
                </div>      
            </div>
            </div>

)}