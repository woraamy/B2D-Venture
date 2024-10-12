// app/api/investment/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investment from "@/models/Investment";
import User from "@/models/user"; // Assuming the investor is a user
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req) {
  try {
    await connectDB();
    const { investor_id, raisedcampaign_id, business_id, amount } = await req.json();

    // Ensure investor and campaign exist
    const investor = await User.findById(investor_id);
    const campaign = await RaiseCampaign.findById(raisedcampaign_id);

    if (!investor || !campaign) {
      return NextResponse.json({ error: "Investor or Campaign not found" }, { status: 404 });
    }

    // Create new investment
    const newInvestment = new Investment({
      investor_id,
      raisedcampaign_id,
      amount,
    });

    await newInvestment.save();

    // Add the investment to the investor's investment history
    investor.investmentHistory.push(newInvestment._id);
    await investor.save();

    return NextResponse.json({ message: "Investment created successfully", investment: newInvestment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
