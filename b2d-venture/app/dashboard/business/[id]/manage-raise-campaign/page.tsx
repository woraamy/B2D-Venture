import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Link from "next/link";
import RaiseCampaign from "@/models/RaiseCampaign";

export default async function ManageRaiseCampaignPage({ params }) {
    const { id } = params;

    // Fetch campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
    let status = "open";

    const campaign = await RaiseCampaign.find({ business_id: id });

    function handleClose() {
        campaign.status = "closed";
        campaign.save();
    }

    try {
        const response = await fetch(campaignUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch raise campaign data");
        }
        const data = await response.json();
        const campaignData = data[0];

        // Determine campaign status based on end_date
        if (new Date(campaignData.end_date) < new Date()) {
            status = "closed";
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
                {/* Edit Campaign button, navigating to the edit-raise-campaign page */}
                <Link href={`/dashboard/business/${id}/edit-raise-campaign`}>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit Campaign
                    </button>
                </Link>

                {/* Create Campaign button, navigating to the create-raise-campaign page */}
                <Link href={`/dashboard/business/${id}/create-raise-campaign`}>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Create Campaign
                    </button>
                </Link>

                {/* Close Campaign button, assuming it will perform some action when clicked */}
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleClose}>
                    Close Campaign
                </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching raise campaign data:", error);
        return <p>Failed to load raise campaign data.</p>;
    }
}