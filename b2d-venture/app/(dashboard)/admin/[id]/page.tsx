import { Button } from "@/components/ui/button";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import ReportCard from "@/components/shared/ReportCard";

export default async function Page({ params }) {
    const {id} = params;

    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            {/* <div id="bar graph" className="flex w-[55vw] h-1/2 border-r-2 border-b-2"> */}
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                    <ReportCard name='Active Investor' amout='100000'/>
                    </div>
                </div>
            {/* </div> */}

        </div>
    </>
    );
};