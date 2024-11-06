"use client"
import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import { promises as fs } from "fs";
import Link from "next/link";
import Business from "@/models/Business"
import RaisedCampaign from "@/models/RaiseCampaign"
import connect from "@/lib/connectDB";
import BusinessCardPagination from "@/components/shared/BusinessCardPagination";
import { useState, useEffect } from "react";
import DataRoom from "@/models/DataRoom";

export default function Page() {
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    async function fetchData(){
            const response = await fetch(`/api/fetchingData/RaiseCampaign`);
            const res = await response.json();
            setData(res.data || []);
            setInitialData(res.data || []);
    }
    
    useEffect(()  => {
        fetchData()
      }, [])
      
    const handleSearchResults = (newData) => {
        setData(newData);  // Update the state with the received search results
        if (!newData){
            setData(newData.length > 0 ? newData : initialData);
        }
      };
    
    return(
        <>
        <div className="max-w-[70%] mx-auto mt-20 mb-20">
            <h1 className="text-[#FF553E] text-[60px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <div className="flex mt-10">
                <SearchBar 
                    text="Search Business" 
                    data={data}
                    onSearch={handleSearchResults}
                    obj={"business_id.BusinessName"}/>
                <Filter className="ms-5"/>
            </div>
            <BusinessCardPagination data={data} itemsPerPage={12} />
           
        </div>
        </>
    );

};
