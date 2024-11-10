import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB";
import { EditRaiseCampaignForm } from "@/components/shared/BusinessDashboard/EditRaiseCampaign";
import RaiseCampaign from "@/models/RaiseCampaign";

export default async function Page({ params }) {
  const { id } = params;

  try {
    await connect(); // Ensure database connection

    // Find the open raise campaign for the specified business_id and make it a plain object
    const openCampaignData = await RaiseCampaign.findOne({ business_id: id, status: "open" }).lean();

    if (!openCampaignData) {
      return <p>No open raise campaign found for this business.</p>;
    }

    // Convert the MongoDB object to a JSON-serializable plain object
    const plainCampaignData = JSON.parse(JSON.stringify(openCampaignData));

    return (
      <EditRaiseCampaignForm params={plainCampaignData._id} data={plainCampaignData} />
    );
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    return <p>Failed to load campaign data.</p>;
  }
};
