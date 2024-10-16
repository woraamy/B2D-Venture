import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import { promises as fs } from "fs";
import Link from "next/link";
import Business from "@/models/Business"
import RaisedCampaign from "@/models/RaiseCampaign"
import connect from "@/lib/connectDB";

const getRaisedCampaign = async () => {
        const raised = await RaisedCampaign.find().populate("business_id")
        return raised 
}


export default async function Page() {
    await connect()
    const data = await getRaisedCampaign()
    return(
        <>
        <div className="max-w-[70%] mx-auto mt-20">
            <h1 className="text-[#FF553E] text-[60px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <div className="flex mt-10">
                <SearchBar text="Search Business"/>
                <Filter className="ms-5"/>
            </div>
            <div className="flex flex-wrap gap-4 ">
                {data.map((campaign,index) =>(
                    <Link href={`/business/${campaign._id}`} passHref key={campaign._id}>
                    <BusinessCard
                    className="mt-10"
                    coverimg = {campaign.business_id.coverimg}
                    profile= {campaign.business_id.profile}
                    name= {campaign.business_id.BusinessName}
                    description={campaign.business_id.description}
                    raised={campaign.raised.toLocaleString()}
                    investors="10"
                    min={campaign.min_investment.toLocaleString()}
                    valuation={campaign.business_id.valuation.toLocaleString()}
                    link={`/business/${campaign.business_id.BusinessName}`}
                    tag = {campaign.business_id.tag_list}
                  />
                  </Link>
                ))}
            </div>
            <Button className="ml-[45%] my-[40px]">
                <span className="text-white">See more</span>
            </Button>
        </div>
        </>
    );

};
