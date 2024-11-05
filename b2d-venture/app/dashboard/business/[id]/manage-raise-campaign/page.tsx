"use client";

import { useState } from "react";
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default async function ManageRaiseCampaignPage({ params }) {
    const { id } = params;

    // Fetch campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
    let status = "open";

    // State to manage campaign data
    const [campaignData, setCampaignData] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch(campaignUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch raise campaign data");
            }
            const data = await response.json();
            setCampaignData(data[0]);

            // Determine campaign status based on end_date
            if (new Date(data[0].end_date) < new Date()) {
                status = "closed";
            }
        } catch (error) {
            console.error("Error fetching raise campaign data:", error);
        }
    }

    // Fetch data on component load
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle closing the campaign via an API request
    async function handleClose() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/closeRaiseCampaign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ campaignId: campaignData._id }), // Assuming the campaign ID is in the response
            });

            if (!response.ok) {
                throw new Error("Failed to close the raise campaign.");
            }

            const result = await response.json();

            // If the status is successfully updated, show a success toast
            if (result.success) {
                toast.success("Raise campaign successfully closed!");
                setCampaignData({ ...campaignData, status: "closed" }); // Update the status in the UI
            } else {
                toast.error("Failed to close the raise campaign. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while closing the raise campaign.");
            console.error("Error closing campaign:", error);
        }
    }

    return (
        <div className="flex flex-col items-center space-y-8 w-[80vw]">
            <div id="toaster"></div> {/* For toasts */}

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
                    status={campaignData.status}
                    businessId={id}
                />
            ) : (
                <p>No raise campaign found for this business.</p>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
                {/* Edit Campaign button */}
                <Link href={`/dashboard/business/${id}/edit-raise-campaign`}>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Edit Campaign
                    </button>
                </Link>

                {/* Create Campaign button */}
                <Link href={`/dashboard/business/${id}/create-raise-campaign`}>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Create Campaign
                    </button>
                </Link>

                {/* Close Campaign button */}
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleClose}
                    disabled={campaignData?.status === "closed"} // Disable if already closed
                >
                    Close Campaign
                </button>
            </div>
        </div>
    );
}
