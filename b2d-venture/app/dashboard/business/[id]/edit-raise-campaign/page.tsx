import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB"
import { EditRaiseCampaignForm } from "@/components/shared/BusinessDashboard/EditRaiseCampaign";

export default async function Page({ params }) {
  const {id} = params;
  await connect();
  const dataroom = await DataRoom.findOne({'business_id':id}).populate('files')
  const files = dataroom ? dataroom.files || [] : [];
  const business = await Business.findById(id)
  const user_id = business.user_id.toString()
  
  return(
    <EditRaiseCampaignForm params={id}/>
  );
};