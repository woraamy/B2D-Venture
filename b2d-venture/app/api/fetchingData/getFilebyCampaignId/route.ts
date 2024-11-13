import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import File from "@/models/file";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaignId");

  if (!campaignId) {
    return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const raiseCampaign = await RaiseCampaign.findById(campaignId);
    if (!raiseCampaign) {
      return NextResponse.json({ error: "Raise campaign not found" }, { status: 404 });
    }

    const businessId = raiseCampaign.business_id.toString();
    console.log("Business ID:", businessId);

    const file = await File.find({ business_id: businessId, type: 'asset' });

    if (file.length === 0) {
      return NextResponse.json({ file: null, message: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ file }, { status: 200 });
  } catch (error) {
    console.error("Error fetching:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
