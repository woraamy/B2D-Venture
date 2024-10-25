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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign`, { next: { tags: ['collection'] } });
    const res = await response.json();
    const campaign = res.data || []
    console.log(campaign)
  
    const data = campaign.map((item,index)=>(
        [
            {value: {src:item.business_id.profile, text:item.business_id.BusinessName},type:"image"},
            {value: item.start_date, type:"text"},
            {value: item.end_date, type:"text"},
            {value: {isHave: true,text: "Detail"}, type: "button"},
            {value: {isHave: true,text: "Edit"}, type: "button"},
            {value: {isHave: true,text: "Delete"}, type: "button"},
        ]
    ))
    const headData = [
        {value:"Business", type:"text"}, 
        {value:"Start Date", type:"text"},
        {value:"End Date", type:"text"},
        {value:"Detail", type:"text"},
        {value:"Edit", type:"text"},
        {value:"Delete", type:"text"},
    ]

    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Business's raise campaign Mangement</h1>
                <div className="flex mt-5 gap-5">
                    <Button>+ Add Raised Campaign</Button>
                    <SearchBar text='Search Raised Campaign'/>
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