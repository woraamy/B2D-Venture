import Image from "next/image";
import { redirect } from 'next/navigation';
import { getUser, addUser } from '@/app/actions/postAction';
import BusinessCard from "@/components/shared/BusinessCard";
import Link from "next/link";
import { promises as fs } from "fs";

export default async function Home() {
    const file = await fs.readFile(process.cwd()+'/public/data/business.json');
    const data = JSON.parse(file.toString());
    
    return (
        <div className="flex-col">
            <div className="flex ">
                <div className="flex ">
                    <div className="flex-col font-semibold w-[50%] ml-20 mt-[10%]">
                        <div className="text-5xl">
                            <h1>Invest in <b className="text-[#FF553E]">Southeast Asia</b>'s best startups</h1>
                        </div>
                        <div className="mt-5">
                            <p>Invest in Southeast Asia's top startups and tap into a fast-growing market. With a thriving tech ecosystem and high digital adoption, this region offers unparalleled opportunities for forward-thinking investors.</p>
                        </div>
                    </div>
                    <div className="relative mt-5 h-[100%] w-[50%]">
                        <Image 
                            src='/assets/icons/home-logo.png' 
                            style={{objectFit:"contain"}}
                            alt="Business Image" 
                            fill={true}
                            className=""
                            />
                    </div>
                </div>

            </div>
            <div className="relative mt-[10%]">
                <div className="static h-[500px] w-auto">
                    <Image 
                        src='/assets/icons/home-vector.png' 
                        style={{objectFit:"contain"}}
                        alt="Business Image" 
                        fill={true}
                        />
                </div>
                <div className="relative z-10 flex justify-between ml-[7%] -top-[30vh] w-[55%] text-2xl font-medium text-[#18063C]">
                    <div>
                        <h1>2500+</h1>
                        <h1>Start Up Business</h1>
                    </div>
                    <div>
                        <h1>100K</h1>
                        <h1>Investor</h1>
                    </div>
                    <div>
                        <h1>1.5B+</h1>
                        <h1>Capital raised</h1>
                    </div>
                </div>
            </div>
            <div className="relative -mt-20">
                <div className="static h-[700px] w-auto">
                    <Image 
                        src='/assets/images/home-image.png' 
                        style={{objectFit:"contain"}}
                        alt="Business Image" 
                        fill={true}
                        />
                </div>
            </div>
            <div className="relative flex-col text-[#FF553E] mx-[15vw] my-20 ">
                <h1 className="font-semibold text-3xl">Trending Businesses</h1>
                <div className="flex flex-wrap gap-3 justify-center">
                {data.slice(0, 3).map((business,index) =>(
                    <Link href={`/business/${business.id}`} passHref>
                    <BusinessCard
                    className="mt-10 mr-5"
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
                  </Link>
                ))}
            </div>
            <h1 className="mt-10 font-semibold text-3xl ">Just launched</h1>
            <div className="flex flex-wrap gap-3 justify-center ">
                {data.slice(9, 12).map((business,index) =>(
                    <Link href={`/business/${business.id}`} passHref>
                    <BusinessCard
                    className="mt-10 mr-5"
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
                  </Link>
                ))}
            </div>
            </div>
        </div>
    )
}
