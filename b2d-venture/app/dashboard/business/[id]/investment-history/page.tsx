"use client"

import TableCard from "@/components/shared/TableCard";
import { useState, useEffect } from 'react';
import PaginationTable from '@/components/shared/PaginationTable';
import Filter from "@/components/shared/filter";
import SearchBar from "@/components/ui/searchbar";

export default  function Page({ params }) {
    const { id } = params;
    const tag = ["closed", "open"]
    const select = ["Newest", "Oldest"]
    const [tableData, setTableData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    async function fetchingData(){
        const response = await fetch(`/api/fetchingData/RaiseCampaign/businessId/${id}`, { next: { revalidate: 100 }});
        const res = await response.json();
        const raise_campaign_list = res || []

        if (!raise_campaign_list?.length) {
            setTableData([]);
            return;
        }
        // Prepare table data for all campaigns
        const tableDatas = [];
        console.log(raise_campaign_list)
        for (const campaign of raise_campaign_list) {
            const response1 = await fetch(`/api/fetchingData/Investment/${campaign._id}`, { next: { revalidate: 100 }});
            const res1 = await response1.json();
            const investmentData = res1.data || [];
            for(const item of investmentData){
                tableDatas.push(item);
            }
        }
        setTableData(tableDatas);
        setInitialData(tableDatas);
    }
    
    useEffect(() => {
        fetchingData();
    }, [])

    const handleSearchResults = (newData) => {
        if (newData && newData.length > 0) {
            setTableData(newData); // Set search results
        } else {
            setTableData(initialData); // Reset to initial data if no results
        }
    };

    const formattedData = tableData.map((item) => [
        { value: item.created_at, type: "text" },
        {
            value: {
                src: item.investor_id.profile_picture,
                text: item.investor_id.firstName + " " + item.investor_id.lastName 
            },
            type: "image"
        },
        { value: item.amount.toLocaleString(), type: "text" },
        { value: ((item.amount / item.raise_campaign_id.raised) * 100).toFixed(2).toLocaleString(), type: "text" },
        { value: (item.amount / item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type: "text" },
        { value:  item.raise_campaign_id.status, type: "text" } // Show campaign status
    ]);
    
    // Define the headers with campaign status column
    const headData = [
        { value: "Date", type: "text" },
        { value: "Investor", type: "text" },
        { value: "Investment Money", type: "text" },
        { value: "Equity Stake", type: "text" },
        { value: "Shares Received", type: "text" },
        { value: "Campaign Status", type: "text" }
    ];

    return (
        <div>
            <div className="ml-[6%] mt-10">
                <div className="mt-7 flex flex-wrap gap-3">
                    <div className='ml-5'>
                        {/* Additional investment overview component if needed */}
                    </div>
                </div>
                <h1 className="font-bold mt-7 text-3xl">Investment History</h1>
                <div className="flex mt-5">
                    <SearchBar 
                                text='Search incestor by name'
                                data={initialData}
                                onSearch={handleSearchResults}
                                obj={"investor_id.firstName"}
                                />
                    <Filter 
                            className="ms-5"
                            onSubmit={handleSearchResults}
                            data={initialData}
                            obj="raise_campaign_id.status"
                            tag={tag}
                            select={select}
                            timeKey="created_at"/>
                </div>
                <TableCard 
                    data={headData} 
                    className='mt-7 mb-5' 
                    valueClassname='font-semibold'
                    onDelete=""/>
                <div className='mb-10'>
                {!tableData.length ? (
                    <p>No raise campaigns available for this business.</p>
                ) : (
                    <PaginationTable 
                    data={formattedData}
                    itemsPerPage={10}
                    onDelete=""
                    buttonIndex={0}
                    onEdit=""
                    />
                )}
                </div>
            </div>
        </div>
    );
};
