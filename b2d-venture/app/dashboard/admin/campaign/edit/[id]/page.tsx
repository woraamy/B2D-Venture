"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { Toaster } from "react-hot-toast";

export default function({params}){
    const {id} = params;
    const router = useRouter();
    const [data, setData] = useState([]);
    // state for data
    const [role,setRole] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    

    async function fetchData(){
        const response = await fetch(`/api/fetchingData/RaiseCampaign/${id}`);
        const data = await response.json();
        setData(data.data || []);
    }
    useEffect(()  => {
        fetchData()
      }, [])
    
      if (data.length === 0) {
        return <div>No campaign data</div>;
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target);
        const response = await fetch(`/api/raisedCampaign/${id}/edit`, {
            method: 'POST',
            body: formData,
        });
    
        const result = await response.json();
        if (response.ok) {
            toast.success("Edit raise campaign success!");  
            router.push('/dashboard/admin/campaign');  
        } else {
            toast.error(result.error || 'Failed to edit raise campaign'); 
        }
    }
     
    return (
        <div className="flex justify-center items-center w-[85vw] ">
            <Toaster />
            <div className="flex flex-col justify-center items-center bg-white w-[60%] h-[50%] rounded-xl shadow-lg p-48">
            <form method="post" onSubmit={handleSubmit}>
            <table className="text-[16px] mt-5">
                <tr>
                    <td className="w-[60%] py-2">Business Name</td>
                    <td className="w-[500px]">
                            <input
                            type="text"
                            name="name"
                            defaultValue={data.business_id.BusinessName}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setName(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">description</td>
                    <td className="w-[500px]">
                            <textarea
                            type="text"
                            name="description"
                            defaultValue={data.business_id.description}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setName(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Valuation cap</td>
                    <td className="w-[500px]">
                            <input
                            type="text"
                            name="valuation"
                            defaultValue={data.business_id.valuation}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setName(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Minimum investment</td>
                    <td className="w-[100%]">
                        <input
                            type="text"
                            name="min"
                            defaultValue={data.min_investment}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setName(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Maximum investment</td>
                    <td className="w-[100%]">
                        <input
                            type="text"
                            name="max"
                            defaultValue={data.max_investment}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setEmail(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Start date</td>
                    <td className="w-[100%]">
                        <input
                            type="date"
                            name="start"
                            defaultValue={data.start_date.slice(0,10)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setEmail(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">End date</td>
                    <td className="w-[100%]">
                        <input
                            type="date"
                            name="end"
                            defaultValue={data.end_date.slice(0,10)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setEmail(e.target.value) }
                            />
                    </td>
                </tr>
            </table>
            <Button className="mt-5 w-[30%] " type="submit">Edit</Button>
            </form>
            </div>
    </div>
    )
}