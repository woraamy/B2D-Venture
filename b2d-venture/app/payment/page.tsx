"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const createPaymentSchema = (minInvestment, maxInvestment) =>
  z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postalCode: z.string().min(4, { message: "Postal Code is required" }),
    cardNumber: z.string().min(16, { message: "Card number must be at least 16 digits" }),
    cvv: z.string().min(3, { message: "CVV must be at least 3 digits" }),
    name: z.string().min(1, { message: "Name on card is required" }),
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

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const [loading, setLoading] = useState(false);
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(0);

  const fetchCampaignData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/${campaignId}`
      );
      const data = await response.json();
      setMinInvestment(data.data.min_investment);
      setMaxInvestment(data.data.max_investment);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  useEffect(() => {
    if (campaignId) fetchCampaignData();
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
          investorDetails: data,
          raisedCampaignId: campaignId,
        }),
      });

      if (response.ok) {
        toast.success("Payment successful!");
        router.push(`/business/${campaignId}`);
      } else {
        toast.error("Failed to process payment.");
      }
    } catch (error) {
      toast.error("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Payment Details
        </h2>
        <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              {...form.register("cardNumber")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1234 5678 9012 3456"
            />
            {form.formState.errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.cardNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              {...form.register("cvv")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123"
            />
            {form.formState.errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.cvv.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Name on Card
            </label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="expiry">
              Expiry Date
            </label>
            <input
              type="text"
              {...form.register("expiry")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="MM/YY"
            />
            {form.formState.errors.expiry && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.expiry.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
              Amount to Invest (in USD)
            </label>
            <input
              type="number"
              {...form.register("amount", { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Investment between ${minInvestment} and ${maxInvestment}`}
            />
            {form.formState.errors.amount && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.amount.message}</p>
            )}
          </div>
              
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input {...form.register("firstName")} placeholder="John" />
              {form.formState.errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input {...form.register("lastName")} placeholder="Doe" />
              {form.formState.errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input {...form.register("address")} placeholder="123 Main St" />
            {form.formState.errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Input {...form.register("city")} placeholder="New York" />
            {form.formState.errors.city && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <Input {...form.register("postalCode")} placeholder="10001" />
            {form.formState.errors.postalCode && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.postalCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Terms and Conditions
            </label>
            <div className="border p-4 rounded-md bg-gray-50 text-gray-600 max-h-64 overflow-y-auto">
            <p className="font-semibold">Please read the following terms carefully:</p>
              <ul className="list-disc pl-4 mt-2 space-y-2">
                <li><strong>Eligibility:</strong> You must be at least 18 years old and legally capable of entering into an investment agreement.</li>
                <li><strong>Investment Risks:</strong> Investing in this raise campaign involves risks, including potential loss of your entire investment. The company does not guarantee returns.</li>
                <li><strong>Commitment:</strong> Once your payment is processed, your investment is binding and non-refundable, except as required by law.</li>
                <li><strong>Payment Terms:</strong> Payments must be made through authorized methods, and transaction fees may apply unless otherwise specified.</li>
                <li><strong>Investor Rights:</strong> Your investment may entitle you to specific rights, as detailed in the campaign documentation.</li>
                <li><strong>Campaign Completion:</strong> If the funding target is not met, the company may refund your investment or offer alternative arrangements.</li>
                <li><strong>Confidentiality:</strong> You agree to keep all campaign-related information confidential.</li>
                <li><strong>Data Privacy:</strong> Your personal information will be handled in accordance with our Privacy Policy.</li>
                <li><strong>Limitation of Liability:</strong> The company is not liable for any indirect, incidental, or consequential damages arising from your investment.</li>
                <li><strong>Dispute Resolution:</strong> Any disputes will be resolved under the laws of [Insert Jurisdiction].</li>
              </ul>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                {...form.register("termsAccepted")}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">
                I accept the terms and conditions.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white font-semibold rounded-md ${
                loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Submit Payment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
