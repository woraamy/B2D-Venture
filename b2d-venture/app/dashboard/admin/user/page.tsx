"use client"
import TableCard from "@/components/shared/TableCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/filter";
import SearchBar from "@/components/ui/searchbar";
import PaginationTable from "@/components/shared/PaginationTable";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Page() {
    const tag = ["investor", "business", "admin"]
    const select = ["Newest", "Oldest"]
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState([]);

    async function fetchData(){
        const response = await fetch('/api/fetchingData/User');
            const data = await response.json();
            setUserData(data.data || []);
            setInitialData(data.data || []);
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

    if (!userData) {
        return <div>No user data</div>;
    }

    async function handleDelete({id}) {
        try{
            const response = await fetch(`/api/user/${id}/delete`, {
                method: 'POST'
            });
            if (response.ok) {
                console.log("Delete User Successful");
                fetchData();
                toast.success("Delete User Successful")
              } else {
                toast.error("Failed to delete user")
                throw new Error("Failed to delete user");
              }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    }

    const handleSearchResults = (newData) => {
        setUserData(newData);  // Update the state with the received search results
        if (!newData){
            setUserData(newData.length > 0 ? newData : initialData);
        }
        };

    const data = userData.map((item,index)=>(
        [
            {value: item.username, type:"text"},
            {value: item.email, type:"text"},
            {value: item.role, type:"text"},
            {value: {isHave: true,text: "Edit", action: "redirect", path: `user/edit/${item._id.toString()}`}, type: "button"},
            {value: {isHave: true,text: "Delete", action: "delete", id: item._id.toString()}, type: "button"},
        ] 
    ))
    const headData = [
        {value:"User", type:"text"}, 
        {value:"Email", type:"text"},
        {value:"Role", type:"text"},
        {value:"Edit", type:"text"},
        {value:"Delete", type:"text"},
    ]

    return(
        <div>
            <Toaster />
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">User Mangement</h1>
                <div className="flex mt-5 gap-5">
                    <Button>+ Add New User</Button>
                    <SearchBar 
                            text='Search user'
                            data={initialData}
                            onSearch={handleSearchResults}
                            obj={"username"}
                            />
                    <Filter 
                            className="ms-5"
                            onSubmit={handleSearchResults}
                            data={initialData}
                            obj="role"
                            tag={tag}
                            select={select}/>
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
                    buttonIndex={4}
                    onEdit={""}
                />
            </div>
            
        </div>
    );
};