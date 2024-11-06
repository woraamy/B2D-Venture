import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { business_id } = await req.json();

    const campaign = await RaiseCampaign.findOne({ business_id: business_id, status: "open" });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    campaign.status = "closed";
    await campaign.save();

    return NextResponse.json({ message: "Campaign closed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error closing raise campaign:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
