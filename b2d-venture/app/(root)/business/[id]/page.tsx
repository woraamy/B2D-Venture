import { promises as fs } from "fs";
import Image from "next/image";
import Tag from "@/components/ui/tag";
import DetailCard from "@/components/shared/DetailCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react';
import Dialog from "@/components/ui/popup";
import Business from "@/models/Business"
import connect from "@/lib/connectDB"
import RaiseCampaign from "@/models/RaiseCampaign";
import ClientComponent from "./ClientComponent";

export default async function Page({params}) {
    const {id} = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/${id}`);
    const {data}  =  await res.json();
    const {campaignId} = data._id
   
    if (!data) {
        return <div>business not found</div>;
    }
  
    return(
        <>
        <Dialog title="Shared profile permission" link={`/business/${id}`} oktext='Allow' successmessage='Send request successed' >
            <p>To provide give a permission to access comany's data we need to verify your identity, collect additional information. By sharing your profile, you consent to the company accessing your details for better service and support.</p>
        </Dialog>
        <div  className="pb-[10%]">
            <div className="flex flex-col gap-1 mt-[3%] ml-[15%] max-w-[50%] flex-grow">
                <div className="flex">
                    <div className="relative h-[100px] w-[100px]">
                        <Image 
                        src={data.business_id.profile}
                        alt="profile"
                        fill={true}
                        style={{objectFit:"cover"}}
                        className="rounded-md "
                        />
                    </div>
                    <div className="ml-5">
                        <h1 className="text-[#18063C] text-[48px] font-semibold">{data.business_id.BusinessName} </h1>
                        {/* <p className="text-[16px]">by {business.company}</p> */}
                    </div>
                </div>
                <p className="mt-5">{data.business_id.description}</p>
                <div className="flex mt-2">

                </div>
                <div className="relative mt-5 h-[30rem] w-[45vw]">
                    <Image 
                    src={data.business_id.coverimg}
                    alt="s"
                    fill={true}
                    style={{objectFit:"cover"}}
                    />
                </div>
                <div className="flex border-b-2 font-semibold w-[90%] mt-10">
                    <h1 className="text-[24px] text-[#FF553E]">Overview</h1>
                    <Link href="#teams" className="text-[18px] ml-5 mt-1">Teams</Link>
                    <Link href="#contact" className="text-[18px] ml-5 mt-1">Contact</Link>
                    <Link href="#update" className="text-[18px] ml-5 mt-1">Updates</Link>
                </div>
                {/* dummy */}
                <div className="mt-7">
                    <h1 className="text-[20px]"><b>Highlight</b></h1>
                    <li className= "mt-5">- High-Impact Technology: AI-driven cancer detection represents a high-growth segment with both financial and societal impact, offering investors a chance to be part of a transformative healthcare innovation.</li>
                    <li>- First-Mover Advantage: By focusing on the teenage and young adult cancer market, we have a clear first-mover advantage in a niche with high unmet needs</li>
                    <li>- Strong Growth Trajectory: With a scalable business model, global market potential, and ongoing advancements in AI, this startup is poised for rapid growth, offering significant returns on investment.</li>
                    <h1 className="text-[20px] mt-7"><b>Oppotunity</b></h1>
                    <div className="relative mt-5 h-[30rem] w-[45vw]">
                        <Image 
                        src='/assets/images/example.png'
                        alt="s"
                        fill={true}
                        style={{objectFit:"cover"}}
                        />
                    </div>
                    <div className="mt-10">
                        <li><b>Niche Focus</b>: There is a growing need for specialized cancer detection tools for teenagers and young adults, an underserved demographic with unique cancer profiles often overlooked by standard diagnostic approaches.</li>
                        <li><b>Growing Market</b>: The global AI healthcare market is projected to grow significantly, with cancer diagnostics being a major focus. Early detection and personalized medicine are key drivers of this growth.</li>
                        <li><b>Impact Potential</b>: By improving early detection rates and reducing misdiagnosis, this technology has the potential to save lives, reduce healthcare costs, and enhance patient outcomes, making it a valuable proposition for healthcare providers and insurers.</li>
                    </div>

                    <h1 id='teams' className="text-[20px] mt-7"><b>Teams</b></h1>

                </div>

            </div>
            <ClientComponent businessId={id} campaignId={campaignId} data={data}/>
            
        </div>
        </>
    )
}