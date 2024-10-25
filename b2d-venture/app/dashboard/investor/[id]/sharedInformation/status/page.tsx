import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
import Link from "next/link";
import connect from "@/lib/connectDB"
import { usePathname } from 'next/navigation';
import InvestorRequest from "@/models/InvestorRequest"

export default async function Page({params}) {
    const {id} = params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/InvestorRequest/${id}`, { next: { tags: ['collection'] } });
    const res = await response.json();
    const request = res.data || []
  
    const data = request.map((item,index)=>(
        [
            {value: item.createdAt.toLocaleString(), type:"text"},
            {value: {src:item.business_id.profile, text:item.business_id.BusinessName},type:"image"},
            {value: item.status, type:"text"},
            {value: {isHave: (item.status === "approved"),text: "View"}, type: "button"}
        ]
    ))
    const headData = [
        {value:"Date", type:"text"}, 
        {value:"Business", type:"text"},
        {value:"Status", type:"text"},
        {value:"View", type:"text"},
    ]

    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Shared Information</h1>
                <div className="flex mt-5">
                    <Link href='status' className="text-xl text-[#FF553E] underline">Status</Link>
                    <Link href='file' className="text-xl ml-10 text-gray-400">Allowed file</Link>
                </div>
                <TableCard data={headData} className='mt-7' valueClassname='font-semibold'/>
                <div>
                    {
                        data.map((item,index)=>(
                            <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold'/>
                        ))
                    }
                </div>
            </div>
            
        </div>
    );
};