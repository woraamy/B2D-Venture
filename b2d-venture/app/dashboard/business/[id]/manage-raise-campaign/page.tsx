import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import RaiseCampaign from "@/models/RaiseCampaign"; 
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";

export default async function ManageRaiseCampaignPage({ params }) {
    const {id}  = params;
    console.log(id);

    // Construct an absolute URL for the fetch request to get the raise campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;

    try {
        const response = await fetch(campaignUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch raise campaign data");
        }
        const data = await response.json();
        const campaignData = data.data[0];

        console.log(campaignData);
        console.log(campaignData._id);

    return (
        <div className="space-y-6">
        <Toaster />
        <div>
            <h3 className="text-lg font-medium">Manage Raise Campaign</h3>
            <p className="text-sm text-muted-foreground">
            View and manage your raise campaign information.
            </p>
        </div>

        {/* Display the campaign data using BusinessRaiseCampaignCard */}
        {campaignData ? (
            <RaiseCampaignCard
            className=""
            name={campaignData.businessName}
            description={campaignData.description}
            raised={campaignData.raised}
            investors={campaignData.investors}
            min={campaignData.minInvestment}
            max={campaignData.maxInvestment}
            valuation={campaignData.valuation}
            tag={campaignData.tags}
            businessId={id} // Passing the business ID for dynamic routes
            />
        ) : (
            <p>No raise campaign found for this business.</p>
        )}

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
            <Link href={`/dashboard/business/${id}/edit-campaign`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Campaign
            </button>
            </Link>
            <Link href={`/dashboard/business/${id}/create-campaign`}>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Create Campaign
            </button>
            </Link>
        </div>
        </div>
    );
    } catch (error) {
    console.error("Error fetching raise campaign data:", error);
    return <p>Failed to load raise campaign data.</p>;
    }
    }
