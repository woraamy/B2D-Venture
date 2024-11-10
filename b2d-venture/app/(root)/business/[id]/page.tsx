import Image from "next/image";
import Link from "next/link";
import React from 'react';
import Dialog from "@/components/shared/AskInFormationPopup";
import ClientComponent from "./ClientComponent";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import RaiseCampaign from "@/models/RaiseCampaign";
import Business from "@/models/Business";

export default async function Page({ params }) {
    const { id } = params; // id = campaign_id
    const data = await RaiseCampaign.findOne({ _id: id, status: "open" })
        .populate({
            path: 'business_id',
            populate: {
                path: 'user_id', 
            },
        })
        .lean(); 
    
    if (!data) {
        return <div>Business not found</div>;
    }

    const business_data = data.business_id;
    const business_id = business_data._id?.toString();
    const campaign_id = data._id?.toString();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    return (
        <>
        <div className="pb-[10%]">
            <div className="flex flex-col gap-1 mt-[3%] ml-[15%] max-w-[50%] flex-grow">
                <div className="flex">
                    <div className="relative h-[100px] w-[100px]">
                        <Image 
                            src={business_data.profile}
                            alt="profile"
                            fill={true}
                            style={{objectFit:"cover"}}
                            className="rounded-md"
                        />
                    </div>
                    <div className="ml-5">
                        <h1 className="text-[#18063C] text-[48px] font-semibold">
                            {business_data.BusinessName}
                        </h1>
                    </div>
                </div>
                <p className="mt-5">{business_data.description}</p>

                {/* Display tag list */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {business_data.tag_list.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="relative mt-5 h-[30rem] w-[45vw]">
                    <Image 
                        src={business_data.coverimg}
                        alt="Cover Image"
                        fill={true}
                        style={{objectFit:"cover"}}
                    />
                </div>
                
                <div className="flex border-b-2 font-semibold w-[90%] mt-10">
                    <h1 className="text-[24px] text-[#FF553E]">Overview</h1>
                    <Link href="#contact" className="text-[18px] ml-5 mt-1">Contact</Link>
                </div>

                <div className="mt-7">
                    <h1 className="text-[20px]"><b>Description</b></h1>
                    <p className="mt-5">{data.description}</p>

                    <h1 className="text-[20px] mt-5"><b>Investment Benefit</b></h1>
                    <div className="mt-5">{data.investment_benefit}</div>

                    <div className="relative mt-5 h-[30rem] w-[45vw]">
                        <Image 
                            src="/assets/images/example.png"
                            alt="Investment Benefit"
                            fill={true}
                            style={{objectFit:"cover"}}
                        />
                    </div>

                    {/* Contact Information */}
                    <h1 id="contact" className="text-[20px] mt-7"><b>Contact</b></h1>
                    <div className="mt-5">
                        <p><b>Email:</b> {business_data.user_id.email}</p>
                        <p><b>Contact Number:</b> {business_data.contactNumber}</p>
                        <p><b>Address:</b> {business_data.BusinessAddress}</p>
                        <p><b>City:</b> {business_data.city}</p>
                        <p><b>State/Province:</b> {business_data.stateProvince}</p>
                        <p><b>Postal Code:</b> {business_data.postalCode}</p>
                        <p><b>Country:</b> {business_data.country}</p>
                    </div>

                </div>
            </div>
            
            {/* Client Component with props */}
            <ClientComponent businessId={business_id} campaignId={campaign_id} userEmail={userEmail}/>
        </div>
        </>
    );
}
