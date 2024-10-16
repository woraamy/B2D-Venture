"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

const createPaymentSchema = (minInvestment: number, maxInvestment: number) =>
  z.object({
    cardNumber: z.string().min(16, { message: "Card number must be at least 16 digits" }),
    cvv: z.string().min(3, { message: "CVV must be at least 3 digits" }),
    name: z.string().min(1, { message: "Name is required" }),
    expiry: z.string().min(5, { message: "Expiry date is required (MM/YY)" }),
    amount: z
      .number()
      .positive({ message: "Amount must be a positive number" })
      .refine(
        (val) => val >= minInvestment && val <= maxInvestment,
        {
          message: `Amount must be between ${minInvestment} and ${maxInvestment}`,
        }
      ),
  });

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const businessId = searchParams.get("businessId");
  const investorId = searchParams.get("investorId");

  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(0);

  const fetchCampaignData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/${campaignId}`
      );
      const data = await response.json();
      setCampaignData(data);
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
      cardNumber: "",
      cvv: "",
      name: "",
      expiry: "",
      amount: 0,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Enter Payment Details</h2>
        <form onSubmit={form.handleSubmit(handlePayment)}>
          {/* Credit Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              {...form.register("cardNumber")}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="1234 5678 9012 3456"
            />
            {form.formState.errors.cardNumber && (
              <p className="text-red-600">{form.formState.errors.cardNumber.message}</p>
            )}
          </div>

          {/* CVV */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              {...form.register("cvv")}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="123"
            />
            {form.formState.errors.cvv && (
              <p className="text-red-600">{form.formState.errors.cvv.message}</p>
            )}
          </div>

          {/* Name on Card */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Name on Card
            </label>
            <input
              type="text"
              {...form.register("name")}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="John Doe"
            />
            {form.formState.errors.name && (
              <p className="text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="expiry">
              Expiry Date
            </label>
            <input
              type="text"
              {...form.register("expiry")}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="MM/YY"
            />
            {form.formState.errors.expiry && (
              <p className="text-red-600">{form.formState.errors.expiry.message}</p>
            )}
          </div>

          {/* Investment Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
              Amount to Invest
            </label>
            <input
              type="number"
              {...form.register("amount", { valueAsNumber: true })}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder={`Investment between ${minInvestment} and ${maxInvestment}`}
            />
            {form.formState.errors.amount && (
              <p className="text-red-600">{form.formState.errors.amount.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150"
          >
            {loading ? "Processing..." : "Submit Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
