"use client"
import InvestorRequestCard from "@/components/shared/AdminDashboard/InvestorRequestCard";
import SearchBar from "@/components/ui/searchbar";
import Filter from "@/components/shared/filter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
    const tag = ["approved", "pending", "declined"]
    const select = ["Newest", "Oldest"]
    const [curData, setCurData] = useState([]);
    const [curInitData, setCurInitData] = useState([]);
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [currentCurPage, setCurrentCurPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;
    const totalCurPages = curData.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;
    const paginationData = data.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
    const paginationCurData = curData.slice((currentCurPage-1)*itemsPerPage,currentCurPage*itemsPerPage);

    async function fetchData(){
            const response = await fetch(`/api/fetchingData/InvestorRequest`);
            const res = await response.json();
            const resData = res.data || [];
            const cur = resData.filter(item => item.status_from_admin === "pending" ) ;
            console.log(res)
            setCurData(cur);
            setCurInitData(cur);
            setData(res.data || []);
            setInitialData(res.data || []);
    }

    useEffect(()  => {
        fetchData()
      }, [])
      

    const handleCurSearchResults = (newData) => {
        setCurData(newData);  // Update the state with the received search results
        if (!newData){
            setCurData(newData.length > 0 ? newData : curInitData);
        } 
      };

    const handleSearchResults = (newData) => {
    setData(newData);  // Update the state with the received search results
    if (!newData){
        setData(newData.length > 0 ? newData : initialData);
    }
    };
    return(
        <div>
            <div className="ml-[10%] mt-[5%] w-[85vw]">
                <h1 className="text-5xl font-bold">Investor request</h1>
                <h1 className="text-3xl mt-5">Current Request</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5">
                        <SearchBar 
                            text="Search Investor request by Investor's first name" 
                            data={curInitData}
                            onSearch={handleCurSearchResults}
                            obj={"investor_id.firstName"}/>
                        <Filter 
                            className="ms-5"
                            onSubmit={handleCurSearchResults}
                            data={curInitData}
                            obj="status_from_admin"
                            tag={[]}
                            select={select}
                            timeKey="createdAt"
                            />
                    </div>
                    <div className="flex px-5 py-5 mt-5 flex-wrap gap-4 justify-normal">
                        {paginationCurData.map((req)=>(
                                <InvestorRequestCard
                                key={req.id} 
                                id={req._id.toString()} 
                                contact={req.investor_id.contactNumber} 
                                name={req.investor_id.firstName}  
                                description={req.investor_id.investor_description}  
                                email={req.investor_id.email}
                                link={req.business_id._id.toString()}
                                business={req.business_id.BusinessName}
                                reason={req.reason}
                                status_from_admin={req.status_from_admin}
                                className='mr-5'
                                time={req.createdAt}
                                />
                            ))}
                    </div> 
                    <div className="flex justify-between mt-10 mb-10">
                        <Button
                            disabled={currentCurPage === 1}
                            onClick={() => setCurrentCurPage(currentCurPage - 1)}
                        >
                            Previous
                        </Button>
                        <span>Page {currentCurPage} of {totalCurPages}</span>
                        <Button
                            disabled={currentCurPage === totalCurPages}
                            onClick={() => setCurrentCurPage(currentCurPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <h1 className="text-3xl mt-5">Request History</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5">
                        <SearchBar 
                                text="Search Investor request by Investor's first name" 
                                data={initialData}
                                onSearch={handleSearchResults}
                                obj={"investor_id.firstName"}/>
                        <Filter 
                            className="ms-5"
                            onSubmit={handleSearchResults}
                            data={initialData}
                            obj="status_from_admin"
                            tag={tag}
                            select={select}
                            timeKey="createdAt"/>
                    </div>
                    <div className="flex px-5 py-5 mt-5 flex-wrap gap-4 justify-normal">
                        {paginationData.map((req)=>(
                                <InvestorRequestCard
                                key={req.id} 
                                id={req._id.toString()}
                                contact={req.investor_id.contactNumber} 
                                name={req.investor_id.firstName}  
                                description={req.investor_id.investor_description}  
                                email={req.investor_id.email}
                                link={req.business_id._id.toString()}
                                business={req.business_id.BusinessName}
                                reason={req.reason}
                                status_from_admin={req.status_from_admin}
                                className='mr-5'
                                time={req.createdAt}
                                />
                            ))}
                    </div> 
                    <div className="flex justify-between mt-10 mb-10">
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
                </div>      
            </div>
            </div>

)}