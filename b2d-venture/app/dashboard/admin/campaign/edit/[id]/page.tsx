"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { Toaster } from "react-hot-toast";
import { EditRaiseCampaignForm } from "@/components/shared/BusinessDashboard/EditRaiseCampaign";

export default function Edit({params}){
    const {id} = params;
    const router = useRouter();
    const [data, setData] = useState<any>({});

    async function fetchData(){
        const response = await fetch(`/api/fetchingData/RaiseCampaign/${id}`);
        const data = await response.json();
        setData(data.data || []);
    }
    useEffect(()  => {
        fetchData()
      }, [])
    
      if (!data || Object.keys(data).length === 0) {
        return <div>No campaign data</div>;
    }
    
    
    async function handleClose() {
        try {
            const response = await fetch(`/api/update/closeRaiseCampaign`, {
                method: "POST",
                body: JSON.stringify({ business_id: data.business_id }),
            });

            if (response.ok) {
                toast.success("Raise campaign closed successfully");
                router.push('/dashboard/admin/campaign');  
            } else {
                toast.error("Failed to close raise campaign");
            }
        } catch (error) {
            toast.error("An error occurred while closing the campaign");
            console.error("Error closing raise campaign:", error);
        }
    }
     
    return (
        <div className="flex flex-col mb-20 justify-center items-center w-[85vw] ">
            <Toaster />
            <EditRaiseCampaignForm params={id} data={data}/> 
            <Button className="w-[10%] bg-red-600 hover:bg-red-700" onClick={handleClose} >Close</Button>
            
        </div>
    )
}