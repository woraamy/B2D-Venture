import Image from "next/image";
import Link from "next/link";
import React from 'react';
import ClientComponent from "./ClientComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import RaiseCampaign from "@/models/RaiseCampaign";
import parse from "html-react-parser";
import { Toaster } from "react-hot-toast";


export default async function Page({ params }) {
    const { id } = params;
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
        <div className="flex justify-center min-h-screen bg-[#FFF5EE] py-10 px-6">
            <Toaster />
            <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full lg:w-2/3">
                {/* Header with Business Name and Profile Image */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0 h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300">
                        <Image
                            src={business_data.profile}
                            alt="profile"
                            fill={true}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {business_data.BusinessName}
                        </h1>
                        <p className="text-gray-600 mt-2">{business_data.description}</p>
                    </div>
                </div>

                {/* Tag List */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {business_data.tag_list.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Cover Image */}
                <div className="relative mt-6 h-80 w-full rounded-lg overflow-hidden">
                    <Image
                        src={business_data.coverimg}
                        alt="Cover Image"
                        fill={true}
                        style={{ objectFit: "cover" }}
                    />
                </div>

                {/* Overview and Navigation */}
                <div className="flex items-center border-b-2 border-gray-200 mt-8 pb-4">
                    <h2 className="text-xl font-semibold text-[#FF553E]">Overview</h2>
                    <Link href="#description" className="text-lg ml-6 text-gray-500 hover:text-[#FF553E]">
                        Description
                    </Link>
                    <Link href="#contact" className="text-lg ml-6 text-gray-500 hover:text-[#FF553E]">
                        Contact
                    </Link>
                </div>

                {/* Description Section */}
                <div id="description" className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                    {/* <p className="text-gray-700 mt-4">{data.description}</p> */}
                    <div className="mt-5">
                        {parse(data.description)}
                    </div>
                    
                </div>

                

                {/* Contact Information */}
                <div id="contact" className="mt-10">
                    <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700">
                        <p><strong>Email:</strong> {business_data.user_id.email}</p>
                        <p><strong>Contact Number:</strong> {business_data.contactNumber}</p>
                        <p><strong>Address:</strong> {business_data.BusinessAddress}</p>
                        <p><strong>City:</strong> {business_data.city}</p>
                        <p><strong>State/Province:</strong> {business_data.stateProvince}</p>
                        <p><strong>Postal Code:</strong> {business_data.postalCode}</p>
                        <p><strong>Country:</strong> {business_data.country}</p>
                    </div>
                </div>
            </div>

            <div className="lg:flex flex-col items-start w-80 ml-8 space-y-6">
                <ClientComponent businessId={business_id} campaignId={campaign_id} userEmail={userEmail} />
            </div>
        </div>
    );
}
