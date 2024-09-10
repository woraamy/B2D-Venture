import Link from "next/link";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";

import "../globals.css";

const Page = () =>{
    const listItems: JSX.Element[] = [];
    for (let i = 0 ; i < 12;i++ ){
        listItems.push(
            <BusinessCard
              key={i} // Adding a unique key prop
              className="mt-10"
              coverimg="/images/b1.png"
              profile="/images/p1.png"
              name="RAD AI"
              description="The Future of AI Marketing"
              raised="100,000"
              investors="20"
              min="500"
              valuation="20,000,000"
            />
          );
        }
      
    return(
        <>
        <Header />
        <div className="max-w-[70%] mx-auto mt-20">
            <h1 className="">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <SearchBar className="mt-10" />
            <div className="flex flex-wrap gap-4 ">
                {listItems}
            </div>
        </div>
        </>
    );
};

export default Page;