"use client"
import Link from "next/link";
import { BsFileBarGraphFill } from "react-icons/bs";
import { RiInformation2Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { CiSquareQuestion } from "react-icons/ci";


export default function AdminSideNav({id}) {
    const pathname = usePathname();
    const dashboard = /^\/admin\/\d+$/.test(pathname) ? "bg-[#FFF8F2] text-[#FF553E]  rounded-xl" : "" ;
    const request = pathname.startsWith("/admin/request" ) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const user = pathname.startsWith("/investor/sharedInformation") ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const campaign = pathname.startsWith("/investor/sharedInformation") ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";

    return(
        <div className="overflow-hidden flex bg-white sticky top-0 left-0 h-[90vh] w-[20%] xl:w-[15%] text-[#A6ABC8]">
            <div className="relative ml-[20%] mt-20 w-[70%] ">
                <span className="p-3">MENU</span>
                <div className={`flex p-3 mt-2 ${dashboard}`}>
                    < BsFileBarGraphFill />
                    <Link href={`/admin/${id}`} className="ml-2">Dashboard</Link>
                </div>
                <div className={`flex mt-2 p-3 ${request}`}>
                    < CiSquareQuestion />
                    <Link href={`/admin/${id}/request`} className="ml-2">Request</Link>
                </div>
                <div className={`flex mt-2 p-3 ${user}`}>
                    < RiInformation2Fill />
                    <Link href={`/admin/${id}/user`} className="ml-2">User</Link>
                </div>
                <div className={`flex mt-2 p-3 ${campaign}`}>
                    < RiInformation2Fill />
                    <Link href={`/admin/${id}/campaign`} className="ml-2">Raise Campaign</Link>
                </div>
            </div>
        </div>
    );
};