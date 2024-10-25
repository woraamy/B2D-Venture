import TableCard from "@/components/shared/TableCard";
import Link from "next/link";
import connect from "@/lib/connectDB"
import { usePathname } from 'next/navigation';
import InvestorRequest from "@/models/InvestorRequest"
import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import SearchBar from "@/components/ui/searchbar";
import PaginationTable from "@/components/shared/PaginationTable";
export default async function Page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/User`, { next: { tags: ['collection'] } });
    const res = await response.json();
    const user = res.data || []
  
    const data = user.map((item,index)=>(
        [
            {value: item.username, type:"text"},
            {value: item.email, type:"text"},
            {value: item.role, type:"text"},
            {value: {isHave: true,text: "Edit"}, type: "button"},
            {value: {isHave: true,text: "Delete"}, type: "button"},
        ]
    ))
    const headData = [
        {value:"User", type:"text"}, 
        {value:"Email", type:"text"},
        {value:"Role", type:"text"},
        {value:"Action", type:"text"},
        {value:"", type:"text"},
    ]

    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">User Mangement</h1>
                <div className="flex mt-5 gap-5">
                    <Button>+ Add new user</Button>
                    <SearchBar text='Search user'/>
                    <Filter className="" />
                </div>
                <TableCard data={headData} className='mt-7' valueClassname='font-semibold'/>
                <PaginationTable 
                    data={data}
                    itemsPerPage={10}
                />
            </div>
            
        </div>
    );
};