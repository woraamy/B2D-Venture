import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm";
import { BusinessAccountForm } from "@/components/shared/AccountForms/BusinessAccountForm";

export default async function SettingsAccountPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Construct an absolute URL for the fetch request
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/getUserRole?userId=${id}`;
  const userUrl =`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investor/${id}`;
  

  try {
    const responseRole = await fetch(apiUrl);
    const responseUser = await fetch(userUrl);
    if (!responseRole.ok) {
      throw new Error("Failed to fetch user role");
    }

    const data = await responseRole.json();
    const userRole = data.role;
    const userData =  await responseUser.json();
    const user = userData.data

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings.
          </p>
        </div>
        {userRole === "investor" ? (
          <InvestorAccountForm params={id} data={user}/>
        ) : userRole === "business" ? (
          <BusinessAccountForm params={id}/>
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
