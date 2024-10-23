"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const InvestmentHistoryCard = ({ className, investorName, investorProfile, investmentAmount, investmentDate, raiseCampaignId }) => {
  return (
    <div className={className}>
      <Card className="shadow-md overflow-hidden relative bg-white w-[420px] h-[110px] rounded-xl">
        <div className="relative group">
          <CardContent className="flex relative z-0">
            <div className="relative w-[50px] h-[50px] mt-5">
              <Image 
                src={investorProfile || "/assets/images/profile-user.png"} 
                style={{ objectFit: "cover" }} 
                alt="Investor Profile" 
                fill={true} 
                className="rounded-full" 
              />
            </div>
            <div className="mt-3 ml-5">
              <div className="flex">
                <span className="text-[#144583] font-semibold text-s">{investorName}</span>
                <span className="ml-auto">{investmentDate}</span>
              </div>
              <table className="text-xs mt-2">
                <tr>
                  <td>Investment Amount</td>
                  <td>
                    <div className="ml-20">$ {investmentAmount.toLocaleString()}</div>
                  </td>
                </tr>
                <tr>
                  <td>Raise Campaign</td>
                  <td>
                    <div className="ml-20">{raiseCampaignId}</div>
                  </td>
                </tr>
              </table>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentHistoryCard;
