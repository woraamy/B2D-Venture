// app/(root)/business/[id]/ClientComponent.tsx (Client Component)
"use client"; // This marks the component as a Client Component

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DetailCard from "@/components/shared/DetailCard";

export default function ClientComponent({
  businessId,
  campaignId,
  data
}: {
  businessId: string;
  campaignId: string;
  data: any;
}) {
  const router = useRouter();

  const handleRedirectToPayment = () => {
    router.push(`/payment?campaignId=${campaignId}&businessId=${businessId}`);
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
