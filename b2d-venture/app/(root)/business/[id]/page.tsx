
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import Dialog from "@/components/shared/AskInFormationPopup";
import ClientComponent from "./ClientComponent";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { useEffect } from "react";
import { toast } from "react-toastify";
import RaiseCampaign from "@/models/RaiseCampaign";
import business from "@/models/Business";
import Business from "@/models/Business";


export default async function Page({params}) {
    const {id} = params; // id = campaign_id
    const data = await RaiseCampaign.findById(id); // data = campaign
    const business_data = await Business.findById(data.business_id);
    const business_id = data.business_id?.toString();
    const campaign_id = data._id?.toString();
    const benefit = data.investment_benefit;
   
    if (!data) {
        return <div>business not found</div>;
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";
  
    return(
        <>
        {/* <Dialog title="Shared profile permission" link={`/business/${id}`} oktext='Allow' successmessage='Send request successed' >
            <p>To provide give a permission to access comany's data we need to verify your identity, collect additional information. By sharing your profile, you consent to the company accessing your details for better service and support.</p>
        </Dialog> */}
        <div  className="pb-[10%]">
            <div className="flex flex-col gap-1 mt-[3%] ml-[15%] max-w-[50%] flex-grow">
                <div className="flex">
                    <div className="relative h-[100px] w-[100px]">
                        <Image 
                        src={business_data.profile}
                        alt="profile"
                        fill={true}
                        style={{objectFit:"cover"}}
                        className="rounded-md "
                        />
                    </div>
                    <div className="ml-5">
                        <h1 className="text-[#18063C] text-[48px] font-semibold">{business_data.BusinessName}</h1>
                    </div>
                </div>
                <p className="mt-5">{business_data.description}</p>
                <div className="flex mt-2">

                </div>
                <div className="relative mt-5 h-[30rem] w-[45vw]">
                    <Image 
                    src={business_data.coverimg}
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
                    <li className= "mt-5">{data.description}</li>
                    <h1 className="text-[20px]"><b>Investment Benefit</b></h1>
                    <div className="mt-5">
                        {data.investment_benefit}
                    </div>
                    <div className="relative mt-5 h-[30rem] w-[45vw]">
                        <Image 
                        src='/assets/images/example.png'
                        alt="s"
                        fill={true}
                        style={{objectFit:"cover"}}
                        />
                    </div>
                    

                    <h1 id='teams' className="text-[20px] mt-7"><b>Teams</b></h1>

                </div>

            </div>
            <ClientComponent businessId={business_id} campaignId={campaign_id} userEmail={userEmail}/>
            
        </div>
        </>
    )
}