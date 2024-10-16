import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/InvestorDashboard/TableCard";
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function Page() {
    const data = [
        {value:"Date", type:"text"}, 
        {value:"Business Profile", type:"text"},
        {value:"Business", type:"text"},
        {value:"Status", type:"text"},
        {value:"View", type:"text"},
    ]
    const view = [
        {value:"Business", type:"text"}
    ]
    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Shared Information</h1>
                <div className="flex mt-5">
                    <Link href='status' className="text-xl text-[#FF553E] underline">Status</Link>
                    <Link href='file' className="text-xl ml-10 text-gray-400">Allowed file</Link>
                </div>
                <TableCard data={data} className='mt-7' valueClassname='font-semibold'/>
            </div>
        </div>
    );
};