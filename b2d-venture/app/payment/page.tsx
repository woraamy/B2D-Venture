"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import investor from "@/models/investor";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const businessId = searchParams.get("businessId");
  const investorId = searchParams.get("investorId");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      toast.success("Payment successful!");

      const response = await fetch("/api/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investor_id: investorId,
          raisedcampaign_id: campaignId,
          amount: amount,
        }),
      });

      if (response.ok) {
        router.push(`/business/${campaignId}`);
      } else {
        toast.error("Failed to create investment.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Enter Payment Details</h2>
        <form onSubmit={handlePayment}>
          {/* Credit Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          {/* CVV */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123"
            />
          </div>

          {/* Name on Card */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="expiry">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="MM/YY"
            />
          </div>

          {/* Investment Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
              Amount to Invest
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="$1000"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          >
            {loading ? "Processing..." : "Submit Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}