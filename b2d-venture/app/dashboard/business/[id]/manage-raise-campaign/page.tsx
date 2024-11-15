"use client";

import { useEffect, useState } from "react";
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import parse from "html-react-parser";

export default function ManageRaiseCampaignPage({ params }) {
    const { id } = params;
    const [campaignData, setCampaignData] = useState(null);
    const [status, setStatus] = useState("open");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(true); // Guard for re-fetching

    // Fetch campaign data on component mount or when re-fetch is triggered
    useEffect(() => {
        if (!shouldFetch) return;

        async function fetchCampaignData() {
            try {
                setLoading(true);
                const campaignUrl = `/api/fetchingData/RaiseCampaign/businessId/${id}`;
                const response = await fetch(campaignUrl);
                if (!response.ok) throw new Error("Failed to fetch raise campaign data");

                const data = await response.json();
                const campaign = data[data.length-1];

                setCampaignData(campaign);
                setStatus(new Date(campaign.end_date) < new Date() ? "closed" : "open");
                setLoading(false);
                setShouldFetch(false); // Reset fetch guard after successful fetch
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchCampaignData();
    }, [id, shouldFetch]);

    // Handle Close Campaign button click
    async function handleClose() {
        try {
            const response = await fetch(`/api/update/closeRaiseCampaign`, {
                method: "POST",
                body: JSON.stringify({ business_id: id }),
            });

            if (response.ok) {
                toast.success("Raise campaign closed successfully");
                setStatus("closed");
                setShouldFetch(false); 
            } else {
                toast.error("Failed to close raise campaign");
            }
        } catch (error) {
            toast.error("An error occurred while closing the campaign");
            console.error("Error closing raise campaign:", error);
        }
    }

    // Handle Create Campaign button click when status is "open"
    function handleCreateAttempt() {
        if (status === "open") {
            toast.error("Cannot create a new raise campaign while another one is open.");
            return;
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Failed to load raise campaign data: {error}</p>;

    return (
        <div className="flex flex-col items-center space-y-5 w-[80vw] mb-10">
            <Toaster />
            <div id="toaster"></div>
        
            {/* Campaign Information */}
            <div className="text-center">
                <h3 className="text-lg font-medium">Manage Raise Campaign</h3>
                <p className="text-sm text-muted-foreground">
                    View and manage your raise campaign information.
                </p>
            </div>
            <div className="flex">
            {/* Campaign Details */}
            {campaignData ? (
                <RaiseCampaignCard
                    className=""
                    businessName={campaignData.business_id.BusinessName}
                    raised={campaignData.raised.toLocaleString()}
                    min={campaignData.min_investment.toLocaleString()}
                    max={campaignData.max_investment.toLocaleString()}
                    valuation={campaignData.business_id.valuation.toLocaleString()}
                    start_date={campaignData.start_date}
                    end_date={campaignData.end_date}
                    shared_price={campaignData.shared_price.toLocaleString()}
                    tag={campaignData.business_id.tag_list}
                    goal={campaignData.goal.toLocaleString()}
                    description={campaignData.description}
                    investment_benefit={campaignData.investmen_benefit}
                    status={campaignData.status}
                    businessId={id}
                />
            ) : (
                <p>No raise campaign found for this business.</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col ml-24 mt-10 gap-4 ">
                {/* Edit Campaign button, disabled if status is "closed" */}
                <Link href={`/dashboard/business/${id}/edit-raise-campaign`}>
                    <button
                        className={`px-4 py-2 w-[15vw] rounded-xl  text-white ${campaignData.status === "open" ? "bg-blue-500 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 opacity-50 text-gray-700 cursor-not-allowed"}`}
                        disabled={campaignData ? campaignData.status === "closed" : true}
                    >
                        Edit Campaign
                    </button>
                </Link>

                {/* Create Campaign button with conditional click handler */}
                <Link href={`/dashboard/business/${id}/create-raise-campaign`}>
                    <button
                        className={`px-4 py-2 w-[15vw] rounded-xl  text-white ${campaignData.status === "closed" ? "bg-green-500 hover:bg-green-700 cursor-pointer" : "bg-gray-400 opacity-50 text-gray-700 cursor-not-allowed"}`}
                        onClick={campaignData.status === "open" ? handleCreateAttempt : undefined}
                        disabled={campaignData ? campaignData.status === "open" : false}
                    >
                        Create Campaign
                    </button>
                </Link>

                {/* Close Campaign button, disabled if status is "closed" */}
                <button
                    className={`"px-4 py-2 w-[15vw] rounded-xl text-white ${campaignData.status === "open" ? "bg-red-500 hover:bg-red-700 cursor-pointer" : "bg-gray-400 opacity-50 text-gray-700 cursor-not-allowed" }`}
                    onClick={handleClose}
                    disabled={campaignData ? campaignData.status === "closed" : false}
                >
                    Close Campaign
                </button>
            </div>
            </div>
        </div>
    );
}
