import Image from "next/image";
import { redirect } from 'next/navigation';
import BusinessCard from "@/components/shared/BusinessCard";
import Link from "next/link";
import { promises as fs } from "fs";
import Business from '@/models/Business'
import RaisedCampaign from '@/models/RaiseCampaign'
import connect from '@/lib/connectDB'

const getRaisedCampaign = async () => {
    const business = await Business.find()
    const trend = await RaisedCampaign.find().populate("business_id").sort({raised: -1 }).limit(3);
    const latest = await RaisedCampaign.find().populate("business_id").sort({start_date: -1 }).limit(3);
    return {trend, latest}
}

export default async function Home() {
    await connect()
    const {trend: trendData, latest :latestData} = await getRaisedCampaign()
    
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
                {trendData.map((campaign,index) =>(
                    <Link href={`/business/${campaign._id}`} passHref key={campaign._id}>
                    <BusinessCard
                    className="mt-10"
                    coverimg = {campaign.business_id.coverimg}
                    profile= {campaign.business_id.profile}
                    name= {campaign.business_id.BusinessName}
                    description={campaign.business_id.description}
                    raised={campaign.raised}
                    investors="10"
                    min={campaign.min_investment}
                    valuation={campaign.business_id.valuation}
                    link={`/business/${campaign.business_id.BusinessName}`}
                    tag = {campaign.business_id.tag_list}
                  />
                  </Link>
                ))}
            </div>
            <h1 className="mt-10 font-semibold text-3xl ">Just launched</h1>
            <div className="flex flex-wrap gap-3 justify-center ">
            {latestData.map((campaign,index) =>(
                    <Link href={`/business/${campaign._id}`} passHref key={campaign._id}>
                    <BusinessCard
                    className="mt-10"
                    coverimg = {campaign.business_id.coverimg}
                    profile= {campaign.business_id.profile}
                    name= {campaign.business_id.BusinessName}
                    description={campaign.business_id.description}
                    raised={campaign.raised}
                    investors="10"
                    min={campaign.min_investment}
                    valuation={campaign.business_id.valuation}
                    link={`/business/${campaign.business_id.BusinessName}`}
                    tag = {campaign.business_id.tag_list}
                  />
                  </Link>
                ))}
            </div>
            </div>
        </div>
    )
}
