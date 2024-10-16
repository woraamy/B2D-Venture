
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DetailCard from "@/components/shared/DetailCard";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect, useState } from "react";
import RaiseCampaign from "@/models/RaiseCampaign";

export default function ClientComponent({
  businessId,
  campaignId,
  userEmail,
}: {
  businessId: string;
  campaignId: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [investorId, setInvestorId] = useState<string | null>(null); 
  const [campaignData, setCampaignData] = useState<any>(null); 
  

  // Function to fetch user role from the server
  const fetchUserRoleandInvestor = async () => {
    try {
      const response = await fetch(`/api/fetchingData/getUserbyEmail?email=${userEmail}`);
      const data = await RaiseCampaign.findById(campaignId); // data = campaign
      const user = await response.json();

      if (user) { 
        setUserRole(user.user.role);
        const investorResponse = await fetch(`/api/fetchingData/getInvestorbyUserId?userId=${user.user._id}`);
        const investor = await investorResponse.json();
        if (investor) {
          setInvestorId(investor.investor._id); 
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

    // Function to fetch campaign data
    const fetchCampaignData = async () => {
      try {
        const campaignData = await RaiseCampaign.findById(campaignId);
        setCampaignData(campaignData); // Store campaign data in state
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

  useEffect(() => {
    if (userEmail) {
      fetchUserRoleandInvestor();
    }
    if (campaignId) {
      fetchCampaignData();
    }
  }, [userEmail]);

  const handleRedirectToPayment = () => {
    
    if (userRole === "investor" && investorId) {
      router.push(`/payment?campaignId=${campaignId}&businessId=${businessId}&investorId=${investorId}`);
    } else {
      toast.error("Only investors can make investments.");
    }
  };

  return (
    <div className="fixed flex flex-col top-[15%] left-[65%]">
      <DetailCard Data={campaignData}/>
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
