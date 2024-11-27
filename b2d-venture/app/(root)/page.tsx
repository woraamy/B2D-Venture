"use client"
import Image from "next/image";
import BusinessCard from "@/components/shared/BusinessCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


function convertDate(time: string): number {
    const [day, month, year] = time.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getTime(); // Convert to numeric timestamp
}

export default function Home() {
    // const {trend: trendData, latest :latestData} = await getRaisedCampaign()
    const [data, setData] = useState([]);
    const [rec, setRec] = useState(0)
    const [curImage, setCurImage] = useState(1)
    async function fetchData(){  
        const response = await fetch("/api/fetchingData/RaiseCampaign");
        const res = await response.json();
        setData(res.data || []);
       
        
    }

    const recommend = [];
    for (let i=0; i<5;i++){
        const random = Math.floor(Math.random() * 12)
        if (recommend.includes(random)){
            i = i-1
            continue;
        } 
        recommend.push(random);
    }
    console.log(recommend)

    
    useEffect(()  => {
        fetchData();
        setRec(recommend[0])
        const interval = setInterval(() => {
            setCurImage(prev => (prev + 1) % 5); 
            setRec(recommend[curImage]);
        }, 5000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, [curImage]);


    const openData = data.filter((item)=>(item.status==="open"))
    const trendData = openData.sort((a, b) => b.raised - a.raised).slice(0,3)
    const latestData = openData.sort((a, b) => 
        convertDate(b.start_date) - convertDate(a.start_date)
    ).slice(0,3)

    // random 12 latest Raise campaign for 5 campaign
    
    return (
        <div className="flex-col">
            <div className="flex ">
                <div className="flex ">
                    <div className="flex-col font-semibold w-[50%] ml-20 mt-[10%]">
                        <div className="text-5xl">
                            <h1>Invest in <b className="text-[#FF553E]">Southeast Asia</b>&apos;s best startups</h1>
                        </div>
                        <div className="mt-5">
                            <p>Invest in Southeast Asia&apos;s top startups and tap into a fast-growing market. With a thriving tech ecosystem and high digital adoption, this region offers unparalleled opportunities for forward-thinking investors.</p>
                        </div>
                    </div>
                    <div className="relative mt-5 h-[100%] w-[50%]">
                        <Image 
                            src={'/assets/icons/home-logo.png'} 
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
                <div className="static h-[50vh] w-[100vw]">
                    {openData.length > 0 && (
                        <div className="relative w-full h-full">
                            <Image 
                                src={openData[rec].business_id.coverimg} 
                                style={{objectFit:"fill"}}
                                alt="Business Image" 
                                fill={true}
                                className=""
                            />
                            <div className="absolute text-white z-30 ml-[20vw] mt-24 max-w-[60%]">
                                <div className="h-[25vh]">
                                <h1 className="text-5xl font-bold">{openData[rec].business_id.BusinessName}</h1>
                                <p className="mt-5 h-[50%]">{openData[rec].business_id.description}</p>
                                </div>
                                <Link href={`business/${openData[rec]._id}`}><Button>View more</Button></Link>
                            </div> 
                            <div className="absolute inset-0 bg-[#000000] bg-opacity-60 z-10"></div> 
                            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between w-[20%] z-20">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <div 
                                    key={index} 
                                    className={`w-4 h-4 rounded-full border-2 ${index === curImage ? 'bg-[#FF553E]' : 'bg-[#353131]'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative flex-col text-[#FF553E] mx-[15vw] my-20 ">
                <h1 className="font-semibold text-3xl">Trending Businesses</h1>
                <div className="flex flex-wrap gap-3 justify-center">
                {trendData.map((campaign,index) =>(
                    <BusinessCard
                    key={index}
                    className="mt-10"
                    coverimg = {campaign.business_id.coverimg}
                    profile= {campaign.business_id.profile}
                    name= {campaign.business_id.BusinessName}
                    description={campaign.business_id.description}
                    raised={campaign.raised}
                    min={campaign.min_investment}
                    valuation={campaign.business_id.valuation}
                    link={`/business/${campaign._id}`}
                    tag = {campaign.business_id.tag_list}
                />
                ))}
            </div>
            <h1 className="mt-10 font-semibold text-3xl ">Just launched</h1>
            <div className="flex flex-wrap gap-3 justify-center ">
            {latestData.map((campaign,index) =>(
                     <BusinessCard
                     key={index}
                     className="mt-10"
                     coverimg = {campaign.business_id.coverimg}
                     profile= {campaign.business_id.profile}
                     name= {campaign.business_id.BusinessName}
                     description={campaign.business_id.description}
                     raised={campaign.raised}
                     min={campaign.min_investment}
                     valuation={campaign.business_id.valuation}
                     link={`/business/${campaign._id}`}
                     tag = {campaign.business_id.tag_list}
                 />
                ))}
            </div>
            </div>
            </div>
    )
}
