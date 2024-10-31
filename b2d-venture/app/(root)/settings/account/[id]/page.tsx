import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm";
import { BusinessAccountForm } from "@/components/shared/AccountForms/BusinessAccountForm";
import { Toaster } from "react-hot-toast";

export default async function SettingsAccountPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Construct an absolute URL for the fetch request
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/getUserRole?userId=${id}`;
  const investorUrl =`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investor/${id}`;
  const businessUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Business/${id}`;

  try {
    const responseRole = await fetch(apiUrl);
    const responseInvestor = await fetch(investorUrl);
    const responseBusiness = await fetch(businessUrl);
    if (!responseRole.ok) {
      throw new Error("Failed to fetch user role");
    }

    const data = await responseRole.json();
    const userRole = data.role;
    const investorData =  await responseInvestor.json();
    const investor = investorData.data
    const bussinessData = await responseBusiness.json();
    const business = bussinessData.data

    return (
      <div className="space-y-6">
        <Toaster />
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings.
          </p>
        </div>
        {userRole === "investor" ? (
          <InvestorAccountForm params={id} data={investor}/>
        ) : userRole === "business" ? (
          <BusinessAccountForm params={id} data={business}/>
        ) : (
          <p>User role not found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user role:", error);
    return <p>Failed to load user role.</p>;
  }
}
