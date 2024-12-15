import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm";
import { Toaster } from "react-hot-toast";

export default async function SettingsAccountPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/getUserRole?userId=${id}`;
  const investorUrl =`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investor/${id}`;

  try {
    const responseRole = await fetch(apiUrl);
    const responseInvestor = await fetch(investorUrl);

    await responseRole.json();
    const investorData =  await responseInvestor.json();
    const investor = investorData.data

    return (
      <>
        <Toaster />
        <div className="space-y-6 mb-10">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight ml-10 mt-10">Settings</h2>
            <p className="text-muted-foreground ml-10">
              Manage your account settings and set your preferences.
            </p>
          </div>
          <div className="flex flex-col ml-10 lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="flex-1 lg:max-w-2xl ml-10 xp-6 rounded-lg ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Account Information
              </h3>
              <InvestorAccountForm params={id} data={investor} />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching user role:", error);
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-lg">Failed to load account settings.</p>
      </div>
    );
  }
}
