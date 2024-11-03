
import { CreateRaiseCampaignForm } from "@/components/shared/BusinessDashboard/CreateRaiseCampaign";

export default async function Page({ params }) {
    const {id} = params;

    return(
        <CreateRaiseCampaignForm params={id} />
      );
};