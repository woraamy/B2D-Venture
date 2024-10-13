
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DetailCard from "@/components/shared/DetailCard";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import { useEffect, useState } from "react";

export default function ClientComponent({
  businessId,
  campaignId,
  data,
  userEmail,
}: {
  businessId: string;
  campaignId: string;
  data: any;
  userEmail: string;
}) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Function to fetch user role from the server
  const fetchUserRole = async () => {
    try {
      const response = await fetch(`/api/checkUserRole?email=${userEmail}`);
      const result = await response.json();
      if (result.user) {
        setUserRole(result.user.role); // Assuming user object contains 'role'
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserRole();
    }
  }, [userEmail]);

  const handleRedirectToPayment = () => {
    if (userRole === "investor") {
      router.push(`/payment?campaignId=${campaignId}&businessId=${businessId}`);
    } else {
      toast.error("Only investors can make investments.");
    }
  };

  return (
    <div className="fixed flex flex-col top-[15%] left-[65%]">
      <DetailCard Data={data}/>
      <Button
        className="text-white w-[30rem] h-[3rem] rounded-3xl mt-7"
        onClick={handleRedirectToPayment}
      >
        Invest
      </Button>
      <Button className="bg-[#D9D9D9] w-[30rem] h-[3rem] rounded-3xl mt-3 hover:text-white">  
        <Link href={`${businessId}?showDialog=y`} >Ask for more information</Link>
      </Button>
    </div>
  );
}
