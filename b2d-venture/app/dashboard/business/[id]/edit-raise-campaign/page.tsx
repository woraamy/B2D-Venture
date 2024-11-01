import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB"
import { EditRaiseCampaignForm } from "@/components/shared/BusinessDashboard/EditRaiseCampaign";

export default async function Page({ params }) {
  const {id} = params;
  
  return(
    <EditRaiseCampaignForm params={id}/>
  );
};