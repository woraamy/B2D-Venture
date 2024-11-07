"use client"
import TableCard from "@/components/shared/TableCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/filter";
import SearchBar from "@/components/ui/searchbar";
import PaginationTable from "@/components/shared/PaginationTable";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Page() {
    const [campaign, setCampaign] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchData(){
        const response = await fetch('/api/fetchingData/RaiseCampaign');
            const data = await response.json();
            setCampaign(data.data || []);
    }
    useEffect(()  => {
        fetchData()
        setLoading(false)
      }, [])
    
      if(loading){
        return(
            <div>
                <img
                src="/assets/icons/icons-loading.gif"
                alt="loading"
                className="object-contain"
              />
            <div className="loader">Loading...</div> 
            </div>
        )
    }
    if (!campaign) {
        return <div>No user data</div>;
    }
    async function handleDelete({id}) {
        try{
            const response = await fetch(`/api/raiseCampaign/${id}/delete`, {
                method: 'POST'
            });
            if (response.ok) {
                console.log("Campaign deleted successfully");
                fetchData()
                toast.success("Delete Campaign Successful");
              } else {
                toast.error("Failed to delete user");
                throw new Error("Failed to delete the Campaign");
              }
        } catch (error) {
            console.error("Failed to delete Campaign:", error);
        }
    }
    const data = campaign.map((item,index)=>(
        [
            {value: {src:item.business_id.profile, text:item.business_id.BusinessName},type:"image"},
            {value: item.start_date, type:"text"},
            {value: item.end_date, type:"text"},
            {value: {isHave: true,text: "View", action: "redirect", path: `/business/${item._id.toString()}`}, type: "button"},
            {value: {isHave: true,text: "Edit", action: "redirect", path: `campaign/edit/${item._id.toString()}`}, type: "button"},
            {value: {isHave: true,text: "Delete", action: "delete", id: item._id.toString()}, type: "button"},
        ] 
    ))
    const headData = [
        {value:"Business", type:"text"}, 
        {value:"Start Date", type:"text"},
        {value:"End Date", type:"text"},
        {value:"View", type:"text"},
        {value:"Edit", type:"text"},
        {value:"Delete", type:"text"},
    ]

    return(
        <div>
            <Toaster />
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Business's raise campaign Mangement</h1>
                <div className="flex mt-5 gap-5">
                    <Button>+ Add Raised Campaign</Button>
                    <SearchBar text='Search Raised Campaign'/>
                    <Filter className="" />
                    <div className="flex bg-white px-5 py-2 w-[100px] items-center rounded-md shadow-sm">
                        total:
                        <p className="px-2"> {data.length}</p>
                    </div>
                </div>
                <TableCard data={headData} className='mt-7' valueClassname='font-semibold'/>
                <PaginationTable 
                    data={data}
                    itemsPerPage={10}
                    onDelete={(id) => handleDelete({ id })}
                    buttonIndex={5}
                />
            </div>
            
        </div>
    );
};