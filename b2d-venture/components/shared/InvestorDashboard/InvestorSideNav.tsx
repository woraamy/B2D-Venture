"use client"
import Link from "next/link";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { IoIosSettings } from "react-icons/io";

export default function InvestorSidenav({id}) {
    const pathname = usePathname();
    const investpage = pathname === `/dashboard/investor/${id}` ? "bg-[#FFF8F2] text-[#FF553E]  rounded-xl" : "" ;
    const historypage = pathname.startsWith(`/dashboard/investor/${id}/history`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const informationpage = pathname.startsWith(`/dashboard/investor/${id}/sharedInformation`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const settings = pathname.startsWith(`/dashboard/investor/${id}/settings`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";

    return(
        <div className="overflow-hidden flex bg-white sticky top-0 left-0 h-[100vh] w-[20%] xl:w-[15%] text-[#A6ABC8]">
            <div className="relative ml-[20%] mt-20 w-[70%] ">
                <span className="p-3">MENU</span>
                <div className={`flex p-3 mt-2 ${investpage}`}>
                    < BsFileBarGraphFill />
                    <Link href={`/dashboard/investor/${id}`} className="ml-2">Dashboard</Link>
                </div>
                <div className={`flex mt-2 p-3 ${historypage}`}>
                    < MdWorkHistory />
                    <Link href={`/dashboard/investor/${id}/history`} className="ml-2">Invest History</Link>
                </div>
                <div className={`flex mt-2 p-3 ${informationpage}`}>
                    < RiInformation2Fill />
                    <Link href={`/dashboard/investor/${id}/sharedInformation/status`} className="ml-2">Shared Information</Link>
                </div>
                <div className={`flex mt-2 p-3 ${settings}`}>
                    < IoIosSettings />
                    <Link href={`/dashboard/investor/${id}/settings`} className="ml-2">Profile Setting</Link>
                </div>
            </div>
        </div>
    );
};