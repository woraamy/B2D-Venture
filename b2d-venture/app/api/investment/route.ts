import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investment from "@/models/Investment";
import User from "@/models/user"; 
import RaiseCampaign from "@/models/RaiseCampaign";
import Investor from "@/models/investor";

export async function POST(req) {
  console.log("Ma laew");
  try {
    await connectDB();
    const { investor_id, raisedcampaign_id, amount } = await req.json();

    // Ensure investor and campaign exist
    const investor = await Investor.findById(investor_id);
    console.log(investor_id);
    console.log(investor);
    console.log(raisedcampaign_id);
    const campaign = await RaiseCampaign.findById(raisedcampaign_id);
    console.log(campaign);

    if (!investor || !campaign) {
      return NextResponse.json({ error: "Investor or Campaign not found" }, { status: 404 });
    }

    const newInvestment = new Investment({
      investor_id,
      raise_campaign_id: raisedcampaign_id,
      amount,
    });

    await newInvestment.save();

    // Add the investment to the investor's investment history
    investor.investment_history.push(newInvestment._id);
    await investor.save();

    return NextResponse.json({ message: "Investment created successfully", investment: newInvestment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
