"use client"
import BusinessRequest from "@/models/businessRequest";
import InvestorRequest from "@/models/InvestorRequest"
import Investor from '@/models/Investor'
import Business from '@/models/Business'
import BusinessRequestCard from "@/components/shared/AdminDashboard/BusinessRequestCard";
import InvestorRequestCard from "@/components/shared/AdminDashboard/InvestorRequestCard";
import SearchBar from "@/components/ui/searchbar";
import Filter from "@/components/shared/filter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [curData, setCurData] = useState([]);
    const [curInitData, setCurInitData] = useState([]);
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([]);

    const [currentCurPage, setCurrentCurPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;
    const totalCurPages = curData.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1;
    const paginationData = data.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
    const paginationCurData = curData.slice((currentCurPage-1)*itemsPerPage,currentCurPage*itemsPerPage);

    async function fetchData(){
            const response = await fetch(`/api/fetchingData/BusinessRequest`);
            const res = await response.json();
            const resData = res.data || [];
            const cur = resData.filter(item => item.status === "pending" ) ;
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

    const handleFilter = (newData) => {
        if (!newData){
            setData(newData.length > 0 ? newData : initialData);
        } else{
            setData(newData); 
        }
    };

    return(
        <div>
            <div className="ml-[10%] mt-[5%] w-[85vw]">
                <h1 className="text-5xl font-bold">Business request</h1>
                <h1 className="text-3xl mt-5">Current Request</h1>
                <div className="w-[80%]">
                    <div className="flex mt-5">
                        <SearchBar 
                        text="Search Business request by business's name" 
                        data={curInitData}
                        onSearch={handleCurSearchResults}
                        obj={"BusinessName"}/>
                        <Filter 
                        className="ms-5"
                        onSubmit={handleFilter}
                        data={curInitData}/>
                    </div>
                    <div className="flex px-5 py-5 mt-5 flex-wrap gap-4 justify-between">
                        {paginationCurData.map((req)=>(
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
                            className='mr-5\'
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
                            text="Search Business request by business's name" 
                            data={initialData}
                            onSearch={handleSearchResults}
                            obj={"BusinessName"}/>
                        <Filter 
                        className="ms-5"
                        onSubmit={handleFilter}
                        data={initialData}/>
                    </div>
                    <div className="flex px-5 py-5 mt-5 flex-wrap gap-4 justify-between">
                        {paginationData.map((req)=>(
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
                            className='mr-5\'
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