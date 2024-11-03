import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB"
import { EditRaiseCampaignForm } from "@/components/shared/BusinessDashboard/EditRaiseCampaign";

export default async function Page({ params }) {
  const {id} = params;
  const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
  try {
    const response = await fetch(campaignUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch raise campaign data");
    }
    const data = await response.json();
    const campaignData = data[0];

    return(
        <EditRaiseCampaignForm params={campaignData._id} data={campaignData} action="edit"/>
      );
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    return <p>Failed to load campaign data.</p>;
  }
};