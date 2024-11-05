import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { business_id } = await req.json();

    const campaign = await RaiseCampaign.find({ business_id: business_id });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }
    campaign.status = "closed";
    console.log('Closing campaign:', campaign);
    
    return NextResponse.json({ message: "Campaign closed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating investor:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
