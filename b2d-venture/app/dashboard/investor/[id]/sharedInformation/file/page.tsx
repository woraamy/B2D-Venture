import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
import Link from "next/link";
export default function Page() {
    const view = [
        {value:"Business", type:"text"}
    ]
    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Shared Information</h1>
                <div className="flex mt-5">
                    <Link href='status' className="text-xl text-gray-400">Status</Link>
                    <Link href='file' className="text-xl ml-10  text-[#FF553E] underline">Allowed file</Link>
                </div>
                <TableCard data={view} className='mt-7' valueClassname='font-semibold'/>
            </div>
        </div>
    );
};