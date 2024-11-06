"use client";

import { useEffect, useState } from "react";
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
                const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
                const response = await fetch(campaignUrl);
                if (!response.ok) throw new Error("Failed to fetch raise campaign data");

                const data = await response.json();
                const campaign = data[0];

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
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Failed to load raise campaign data: {error}</p>;

    return (
        <div className="flex flex-col items-center space-y-8 w-[80vw]">
            <div id="toaster"></div>

            {/* Campaign Information */}
            <div className="text-center">
                <h3 className="text-lg font-medium">Manage Raise Campaign</h3>
                <p className="text-sm text-muted-foreground">
                    View and manage your raise campaign information.
                </p>
            </div>

            {/* Campaign Details */}
            {campaignData ? (
                <RaiseCampaignCard
                    className=""
                    businessName={campaignData.business_id.BusinessName}
                    description={campaignData.business_id.description}
                    raised={campaignData.raised.toLocaleString()}
                    min={campaignData.min_investment.toLocaleString()}
                    max={campaignData.max_investment.toLocaleString()}
                    valuation={campaignData.business_id.valuation.toLocaleString()}
                    start_date={campaignData.start_date}
                    end_date={campaignData.end_date}
                    shared_price={campaignData.shared_price.toLocaleString()}
                    tag={campaignData.business_id.tag_list}
                    goal={campaignData.goal.toLocaleString()}
                    status={status}
                    businessId={id}
                />
            ) : (
                <p>No raise campaign found for this business.</p>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
                {/* Edit Campaign button, disabled if status is "closed" */}
                <Link href={`/dashboard/business/${id}/edit-raise-campaign`}>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={status === "closed"}
                    >
                        Edit Campaign
                    </button>
                </Link>

                {/* Create Campaign button with conditional click handler */}
                <Link href={`/dashboard/business/${id}/create-raise-campaign`}>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={status === "open" ? handleCreateAttempt : undefined}
                        disabled={status === "open"}
                    >
                        Create Campaign
                    </button>
                </Link>

                {/* Close Campaign button, disabled if status is "closed" */}
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleClose}
                    disabled={status === "closed"}
                >
                    Close Campaign
                </button>
            </div>
        </div>
    );
}
