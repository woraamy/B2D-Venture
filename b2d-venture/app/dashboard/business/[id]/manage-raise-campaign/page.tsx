import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Script from "next/script";
import { toast } from "react-hot-toast"; // Toast for client-side notifications

export default async function ManageRaiseCampaignPage({ params }) {
    const { id } = params;

    // Fetch campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
    let status = "Open";

    try {
        const response = await fetch(campaignUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch raise campaign data");
        }
        const data = await response.json();
        const campaignData = data.data[0];

        // Determine campaign status based on end_date
        if (new Date(campaignData.end_date) < new Date()) {
            status = "Closed";
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
                        status={status}
                        businessId={id}
                    />
                ) : (
                    <p>No raise campaign found for this business.</p>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <button
                        data-modal-target="editModal"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit Campaign
                    </button>
                    <button
                        data-modal-target="createModal"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Create Campaign
                    </button>
                </div>

                {/* Include the client-side script */}
                <Script src="/scripts/modal.js" />
            </div>
        );
    } catch (error) {
        console.error("Error fetching raise campaign data:", error);
        return <p>Failed to load raise campaign data.</p>;
    }
}
