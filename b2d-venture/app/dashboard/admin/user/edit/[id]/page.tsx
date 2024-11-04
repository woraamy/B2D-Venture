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
        const response = await fetch(`/api/fetchingData/User/${id}`);
        const data = await response.json();
        setData(data.data || []);
    }
    useEffect(()  => {
        fetchData()
      }, [])
    
      if (data.length === 0) {
        return <div>No user data</div>;
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target);
        const response = await fetch(`/api/user/${id}/edit`, {
            method: 'POST',
            body: formData,
        });
    
        const result = await response.json();
        if (response.ok) {
            toast.success(result.message);  
            router.push('/dashboard/admin/user');  
        } else {
            toast.error(result.error || 'Failed to edit user'); 
        }
    }
     
    return (
        <div className="flex justify-center items-center w-[85vw] ">
            <Toaster />
            <div className="flex flex-col justify-center items-center bg-white w-[60%] h-[40%] rounded-xl shadow-lg p-48">
            <form method="post" onSubmit={handleSubmit}>
            <table className="text-[16px] mt-5">
                <tr>
                    <td className="w-[60%] py-2">Role</td>
                    <td className="w-[500px]">
                            <select 
                            onChange={(e)=> setRole(e.target.value)}
                            name="role"
                            >
                            <option>{data.role}</option>
                            <option>admin</option>
                            </select>
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Username</td>
                    <td className="w-[100%]">
                        <input
                            type="text"
                            name="name"
                            defaultValue={data.username}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setName(e.target.value) }
                            />
                    </td>
                </tr>
                <tr>
                    <td className="w-[60%] py-2">Email</td>
                    <td className="w-[100%]">
                        <input
                            type="text"
                            name="email"
                            defaultValue={data.email}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e)=> setEmail(e.target.value) }
                            />
                    </td>
                </tr>
            </table>
            <Button className="mt-10 w-[30%] " type="submit">Edit</Button>
            </form>
            </div>
    </div>
    )
}