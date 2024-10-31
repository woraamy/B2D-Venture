import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";

export default async function ManageRaiseCampaignPage({ params }) {
    const { id } = params;

    // Construct an absolute URL for the fetch request to get the raise campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
    const investmentUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`;

    try {
        const response = await fetch(campaignUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch raise campaign data");
        }
        const data = await response.json();
        const campaignData = data.data[0];

        return (
            <div className="flex flex-col items-center space-y-8 w-[80vw]">
                <Toaster />
                <div className="text-center">
                    <h3 className="text-lg font-medium">Manage Raise Campaign</h3>
                    <p className="text-sm text-muted-foreground">
                        View and manage your raise campaign information.
                    </p>
                </div>

                {/* Display the campaign data using RaiseCampaignCard */}
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
                        businessId={id} // Passing the business ID for dynamic routes
                    />
                ) : (
                    <p>No raise campaign found for this business.</p>
                )}

                {/* Action buttons */}
                <div className="flex space-x-4">
                    <Link href={`/dashboard/business/${id}/edit-campaign`}>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Edit Campaign
                        </button>
                    </Link>
                    <Link href={`/dashboard/business/${id}/open-campaign`}>
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Open Campaign
                        </button>
                    </Link>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Close
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching raise campaign data:", error);
        return <p>Failed to load raise campaign data.</p>;
    }
}
