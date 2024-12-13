import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investment from "@/models/Investment";
import User from "@/models/user"; 
import RaiseCampaign from "@/models/RaiseCampaign";
import Investor from "@/models/Investor";
import toast from "react-hot-toast";
import Business from "@/models/Business";

export async function POST(req) {
  try {
    await connectDB();
    const { investor_id, raisedcampaign_id, amount } = await req.json();

    const investor = await Investor.findById(investor_id);
    const campaign = await RaiseCampaign.findById(raisedcampaign_id);
    const business = await Business.findById(campaign.business_id);
    const fee = amount * 0.03;

    if (!investor || !campaign) {
      return NextResponse.json({ error: "Investor or Campaign not found" }, { status: 404 });
    }

    const newInvestment = new Investment({
      investor_id,
      raise_campaign_id: raisedcampaign_id,
      amount,
      fee: fee,
    });

    await newInvestment.save();

    campaign.raised += parseInt(amount);
    await campaign.save();

    business.valuation += parseInt(amount);
    await business.save();

    return NextResponse.json({ message: "Investment created successfully", investment: newInvestment }, { status: 201 });
  } catch (error) {
    console.error(error);
    // console.log(Business);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
