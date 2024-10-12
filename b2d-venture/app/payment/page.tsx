"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify"; // For success notification
import "react-toastify/dist/ReactToastify.css";


export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Always pass the transaction
      setLoading(false);
      toast.success("Payment successful!");

      // Redirect to the business page after success
      router.push(`/business/${businessId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Invest with Credit Card</h2>
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
