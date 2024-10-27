import { useEffect, useState } from "react";
import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm";
import { BusinessAccountForm } from "@/components/shared/AccountForms/BusinessAccountForm";

export default function SettingsAccountPage({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      const role = await getUserRole(params.id);
      setUserRole(role);
    }

    fetchUserRole();
  }, [params.id]);

  if (!userRole) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      {userRole === "investor" ? (
        <InvestorAccountForm />
      ) : userRole === "business" ? (
        <BusinessAccountForm />
      ) : (
        <p>User role not found.</p>
      )}
    </div>
  );
}

// Utility function to fetch the user role
async function getUserRole(userId: string) {
  try {
    const response = await fetch(`/api/getUserRole?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user role");
    }
    const data = await response.json();
    return data.user_role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}
