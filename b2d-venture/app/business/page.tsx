import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import "../globals.css";
import { promises as fs } from "fs";
import { IoFilter } from "react-icons/io5";



export default async function Page() {
    const file = await fs.readFile(process.cwd()+'/public/data/mockup.json');
    const data = JSON.parse(file);
      
    return(
        <>
        <Header />
        <div className="max-w-[70%] mx-auto mt-20">
            <h1 className="text-[#FF553E] text-[60px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <div className="flex mt-10">
                <SearchBar />
                <Filter className="ms-5"/>
                {/* <Button className='text-white ms-5'>
                    <IoFilter />            
                    Filter
                </Button> */}
            </div>
            <div className="flex flex-wrap gap-4 ">
                {data.map(business =>(
                    <BusinessCard
                    className="mt-10"
                    coverimg = {business.coverimg}
                    profile= {business.profile}
                    name= {business.business_name}
                    description={business.description}
                    raised={business.raised}
                    investors={business.investors}
                    min={business.min}
                    valuation={business.valuation}
                    link={`/business/${business.business_name}`}
                    tag = {business.tag}
                  />
                ))}
            </div>
            <Button className="ml-[45%] my-[40px]">
                <span className="text-white">See more</span>
            </Button>
        </div>
        <Footer />
        </>
    );

};

// export default Page;