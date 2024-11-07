import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/filter";
import { promises as fs } from "fs";
import Link from "next/link";
import Business from "@/models/Business"
import RaisedCampaign from "@/models/RaiseCampaign"
import connect from "@/lib/connectDB";
import BusinessCardPagination from "@/components/shared/BusinessCardPagination";

// const getRaisedCampaign = async () => {
//         const raised = await RaisedCampaign.find().populate("business_id")
//         return raised 
// }


export default async function Page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign`, { next: { tags: ['collection'] } });
    const res = await response.json();
    const data = res.data || []
    return(
        <>
        <div className="max-w-[70%] mx-auto mt-20 mb-20">
            <h1 className="text-[#FF553E] text-[60px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <div className="flex mt-10">
                <SearchBar text="Search Business"/>
                <Filter className="ms-5"/>
            </div>
            <BusinessCardPagination data={data} itemsPerPage={12} />
           
        </div>
        </>
    );

};
