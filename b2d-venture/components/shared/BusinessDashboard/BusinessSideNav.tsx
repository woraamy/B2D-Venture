"use client"
import Link from "next/link";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdOutlineWorkHistory } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { IoIosSettings } from "react-icons/io";
import { MdCampaign } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs"

export default function InvestorSidenav({id}) {

    // dataroom (/dataroom)
    // dashboard (/dashboard)
    // create and edit raise campaign (/manage-raise-campaign)
    // investment history (/investment-history)
    // settings (/settings)
    const pathname = usePathname();
    const businesspage = pathname === `/dashboard/business/${id}` ? "bg-[#FFF8F2] text-[#FF553E]  rounded-xl" : "" ;
    const historypage = pathname.startsWith(`/dashboard/business/${id}/investment-history`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const raisecampaignmanagementpage = pathname.startsWith(`/dashboard/business/${id}/manage-raise-campaign`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const setting = pathname.startsWith(`/settings/account/${id}`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";
    const dataroom = pathname.startsWith(`/dashboard/business/${id}/dataroom`) ? "bg-[#FFF8F2] text-[#FF553E] p-3 rounded-xl" : "";

    return(
        <div className="overflow-hidden flex bg-white sticky top-0 left-0 h-[100vh] w-[20%] xl:w-[15%] text-[#A6ABC8]">
            <div className="relative ml-[20%] mt-20 w-[70%] ">
                <span className="p-3">MENU</span>
                <div className={`flex p-3 mt-2 ${businesspage}`}>
                    < BsFileBarGraphFill />
                    <Link href={`/dashboard/business/${id}`} className="ml-2">Dashboard</Link>
                </div>
                <div className={`flex mt-2 p-3 ${historypage}`}>
                    <MdOutlineWorkHistory />
                    <Link href={`/dashboard/business/${id}/investment-history`} className="ml-2">Investment History</Link>
                </div>
                <div className={`flex mt-2 p-3 ${raisecampaignmanagementpage}`}>
                    <MdCampaign />
                    <Link href={`/dashboard/investor/${id}/sharedInformation/status`} className="ml-2">Manage Raise Campaign</Link>
                </div>
                <div className={`flex mt-2 p-3 ${setting}`}>
                    < IoIosSettings />
                    <Link href={`/settings/account${id}`} className="ml-2">Profile Setting</Link>
                </div>
                <div className={`flex mt-2 p-3 ${dataroom}`}>
                    <BsDatabaseFillAdd />
                    <Link href={`/dashboard/business/${id}/dataroom`} className="ml-2">Dataroom</Link>
                </div>

            </div>
        </div>
    );
};