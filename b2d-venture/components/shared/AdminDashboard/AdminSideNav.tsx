"use client"
import Link from "next/link";
import { BsFileBarGraphFill } from "react-icons/bs";
import { usePathname } from 'next/navigation';
import { FaUser } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import { MdBusinessCenter } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";



export default function AdminSideNav() {
    const pathname = usePathname();
    const dashboard = pathname === "/admin" ? "bg-[#FFF8F2] text-[#FF553E]  rounded-xl" : "" ;
    const businessrequest = pathname === "/admin/business-request" ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const investorrequest = pathname === "/admin/investor-request" ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const user = pathname === "/admin/user" ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const campaign = pathname === "/admin/campaign" ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";

    return(
        <div className="overflow-hidden flex bg-white sticky top-0 left-0 h-[100vh] w-[20%] xl:w-[15%] text-[#A6ABC8]">
            <div className="relative ml-[20%] mt-20 w-[70%] ">
                <span className="p-3">MENU</span>
                <div className={`flex p-3 mt-2 ${dashboard}`}>
                    < BsFileBarGraphFill />
                    <Link href={`/admin`} className="ml-2">Dashboard</Link>
                </div>
                <div className={`flex mt-2 p-3 ${businessrequest}`}>
                    < MdBusinessCenter />
                    <Link href={`/admin/business-request`} className="ml-2">Business Request</Link>
                </div>
                <div className={`flex mt-2 p-3 ${investorrequest}`}>
                    < IoIosInformationCircle />
                    <Link href={`/admin/investor-request`} className="ml-2">Investor Request</Link>
                </div>
                <div className={`flex mt-2 p-3 ${user}`}>
                    < FaUser />
                    <Link href={`/admin/user`} className="ml-2">User</Link>
                </div>
                <div className={`flex mt-2 p-3 ${campaign}`}>
                    < SiCampaignmonitor />
                    <Link href={`/admin/campaign`} className="ml-2">Raise Campaign</Link>
                </div>
            </div>
        </div>
    );
};