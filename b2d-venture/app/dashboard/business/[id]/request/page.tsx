import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
import Investment from "@/models/Investment";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";
import Business from "@/models/Business";
import InvestorRequestCard from '@/components/shared/BusinessDashboard/InvestorRequestCard';
import PaginationTable from '@/components/shared/PaginationTable';

export default async function Page({params}) {
    const {id} = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/InvestorRequest/${id}/business`, { next: { revalidate: 100 }});
    const res = await response.json();
    const request = res.data || [];
    const filteredData = request.filter((item) => item.status_from_business === "pending")
    
    const data = request.map((item,index)=>(
        [
            {value: {text:  item.investor_id.firstName || "NO first name data", src: item.investor_id.profile_picture}, type:"image"},
            {value: item.status_from_business, type:"text"},
            {value: item.investor_id.investor_description, type:"text"},
            {value: item.reason, type:"text"},

        ] 
    ))
    const headData = [
        {value:"User", type:"text"}, 
        {value:"status", type:"text"},
        {value:"bio", type:"text"},
        {value:"reason", type:"text"},
    ]

    return(
        <div className='w-[85vw] mt-'>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold mt-7 text-3xl">Investor's Request Manage</h1>
                <div className="mt-7 flex flex-wrap gap-3">
                    <div className='ml-5'>
                    {filteredData.map((req)=>(
                                <InvestorRequestCard
                                key={req.id} 
                                id={req._id.toString()} 
                                contact={req.investor_id.contactNumber} 
                                name={req.investor_id.name}  
                                description={req.investor_id.investor_description}  
                                email={req.investor_id.email}
                                profile={req.investor_id.profile_picture}
                                business={req.business_id.BusinessName}
                                reason={req.reason}
                                status_from_business={req.status_from_business}
                                className='mr-5'
                                time={req.createdAt}
                                />
                            ))}
                    </div>
                    </div>
                    <div className='mb-10'>
                    <h1 className="font-bold mt-7 text-3xl"> History </h1>
                        <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold'/>
                        <PaginationTable 
                        data={data}
                        itemsPerPage={10}
                         />
                    </div>
               
            </div>
        </div>
    );
};