"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createPaymentSchema = (minInvestment, maxInvestment) =>
  z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postalCode: z.string().min(4, { message: "Postal Code is required" }),
    cardNumber: z.string().min(12, { message: "Card number must be at least 12 digits" }),
    cvv: z.string().min(3, { message: "CVV must be at least 3 digits" }),
    name: z.string().min(1, { message: "Name on card is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
    amount: z
      .number()
      .positive({ message: "Amount must be a positive number" })
      .refine(
        (val) => val >= minInvestment && val <= maxInvestment,
        {
          message: `Amount must be between ${minInvestment} and ${maxInvestment}`,
        }
      ),
    termsAccepted: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions." }) }),
  });

export default function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const campaignId = searchParams.get("campaignId");
  const businessId = searchParams.get("businessId");
  const investorId = searchParams.get("investorId");

  const [loading, setLoading] = useState(false);
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(0);
  const [campaignData, setCampaignData] = useState(null);

  const fetchCampaignData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/${campaignId}`
      );
      const data = await response.json();
      setCampaignData(data.data);
      setMinInvestment(data.data.min_investment);
      setMaxInvestment(data.data.max_investment);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId]);

  const form = useForm({
    resolver: zodResolver(createPaymentSchema(minInvestment, maxInvestment)),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      cvv: "",
      name: "",
      country: "",
      expiry: "",
      amount: 0,
      termsAccepted: false,
    },
  });

  const handlePayment = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investor_id: investorId,
          raisedcampaign_id: campaignId,
          amount: data.amount,
        }),
      });

      if (response.ok) {
        toast.success("Payment successful!");
        router.push(`/business/${campaignId}`);
      } else {
        toast.error("Failed to create investment.");
      }
    } catch (error) {
      toast.error("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* The rest of the Payment Page JSX */}
      {/* Omitted for brevity */}
    </div>
  );
}
