// pages/dashboard/business/[id]/manage-raise-campaign.tsx
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import RaiseCampaign from "@/models/RaiseCampaign"; 

export default async function ManageRaiseCampaignPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Construct an absolute URL for the fetch request to get the raise campaign data
  const raiseCampaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;

  try {
    const response = await fetch(raiseCampaignUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch raise campaign data");
    }

    const raiseCampaignData = await response.json();
    const campaign = raiseCampaignData.data; // Assuming the API returns campaign data under `data`

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
        {campaign ? (
          <RaiseCampaign
            coverimg={campaign.coverImage}
            profile={campaign.profileImage}
            name={campaign.businessName}
            description={campaign.description}
            raised={campaign.raised}
            investors={campaign.investors}
            min={campaign.minInvestment}
            valuation={campaign.valuation}
            tag={campaign.tags}
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
