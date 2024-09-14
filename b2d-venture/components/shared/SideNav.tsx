"use client"
import Link from "next/link";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';

export default async function Sidenav() {
    const pathname = usePathname();
    // if(pathname == "/investor"){
    //     const investpage = "bg-black";
    // }
    const investpage = pathname === "/investor" ? "bg-white text-[#FF553E]  rounded-xl" : "";
    const historypage = pathname === "/investor/history" ? "bg-white text-[#FF553E] p-3 rounded-xl" : "";
    const informationpage = pathname === "/investor/information" ? "bg-white text-[#FF553E] p-3 rounded-xl" : "";

    return(
        <div className="overflow-hidden flex bg-[#FFF8F2] sticky top-0 left-0 h-screen w-[20%]">
            <div className="relative ml-[20%] mt-20 w-[70%] ">
                <div className={`flex p-3 ${investpage}`}>
                    < BsFileBarGraphFill />
                    <Link href='/investor' className="ml-2">Dashboard</Link>
                </div>
                <div className={`flex mt-2 p-3 ${historypage}`}>
                    < MdWorkHistory />
                    <Link href='/investor/history' className="ml-2">Invest History</Link>
                </div>
                <div className={`flex mt-2 p-3 ${informationpage}`}>
                    < RiInformation2Fill />
                    <Link href='/investor/sharedInformation' className="ml-2">Shared Information</Link>
                </div>
            </div>
        </div>
    );
};