import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/ui/searchbar";
import BusinessCard from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import "../globals.css";

const Page = () =>{
    const tag = ["AI", "Science", "Technology"]
    const listItems: JSX.Element[] = [];
    for (let i = 0 ; i < 12;i++ ){
        listItems.push(
            <BusinessCard
              key={i} // Adding a unique key prop
              className="mt-10"
              coverimg="/assets/images/b1.png"
              profile="/assets/images/p1.png"
              name="RAD AI"
              description="The Future of AI Marketingkjhjkjkjhjkjhkjkjhufrrsd kkln;lkmo[m ygj uiu6ylih;"
              raised="100,000"
              investors="20"
              min="500"
              valuation="20,000,000"
              link="/businessas"
              tag = {tag}
            />
          );
        }
      
    return(
        <>
        <Header />
        <div className="max-w-[70%] mx-auto mt-20">
            <h1 className="text-[#FF553E] text-[48px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow's leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia 
                Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects that are shaping the region's future growth."
            </p>
            <SearchBar className="mt-10" />
            <div className="flex flex-wrap gap-4 ">
                {listItems}
            </div>
            <Button className="ml-[45%] my-[40px]">
                <span className="text-white">See more</span>
            </Button>
        </div>
        <Footer />
        </>
    );

};

export default Page;