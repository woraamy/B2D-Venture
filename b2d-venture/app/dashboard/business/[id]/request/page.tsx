"use client"
import TableCard from "@/components/shared/TableCard";
import { useState, useEffect } from "react";
import InvestorRequestCard from '@/components/shared/BusinessDashboard/InvestorRequestCard';
import PaginationTable from '@/components/shared/PaginationTable';
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";
import Filter from "@/components/shared/filter";
export default function Page({params}) {
    const {id} = params;
    const tag = ["approved", "pending", "declined"]
    const select = ["Newest", "Oldest"]
    const [request, setRequest] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    async function fetchingData(){
        const response = await fetch(`/api/fetchingData/InvestorRequest/${id}/business`, { next: { revalidate: 100 }});
        const res = await response.json();
        const req = res.data || [];
        const filtered = req.filter((item) => item.status_from_business === "pending");
        setRequest(req);
        setInitialData(req);
        setFilteredData(filtered);
    }
    
    useEffect(() => {
        fetchingData();
    }, [])
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
    // Set up pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const totalPages = filteredData.length > 0 ? Math.ceil(filteredData.length/itemsPerPage) : 1
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearchResults = (newData) => {
        if (newData && newData.length > 0) {
            setRequest(newData); // Set search results
        } else {
            setRequest(initialData); // Reset to initial data if no results
        }
    };
    
    return(
        <div className='w-[80vw] mt-'>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold mt-7 text-3xl">Investor's Request Manage</h1>
                <div className="mt-7 flex flex-wrap gap-3 w-full h-[35vh] z-0">
                    {paginatedData.map((req)=>(
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
                    
                    <div className="flex justify-between mt-5 z-10">
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>

                    <div className='mb-10'>
                    <h1 className="font-bold mt-7 text-3xl"> History </h1>
                        <div className="flex mt-5">
                            <SearchBar 
                                text="Search Investor request by investor's name" 
                                data={initialData}
                                onSearch={handleSearchResults}
                                obj={"investor_id.firstName"}/>
                            <Filter 
                                className="ms-5"
                                onSubmit={handleSearchResults}
                                data={initialData}
                                obj="status_from_business"
                                tag={tag}
                                select={select}
                                timeKey="createdAt"/>
                        </div>
                        <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold' onDelete=""/>
                        <PaginationTable 
                        data={data}
                        itemsPerPage={10} buttonIndex={undefined} onDelete={undefined} onEdit={undefined}                         />
                    </div>
               
            </div>
        </div>
    );
};