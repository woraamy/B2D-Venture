import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: NextRequest) {
  try {
    const {
      business_id,
      raised,
      shared_price,
      min_investment,
      max_investment,
      goal,
      description,
      files,
      start_date,
      end_date,
      status,
    } = await req.json();

    // Connect to the database
    await connectDB();

    // Check if there is any existing raise campaign with the same business_id that is still open
    const existingOpenCampaign = await RaiseCampaign.findOne({
      business_id: business_id,
      status: "open"
    });
    
    // If an open campaign exists, send an error response
    if (existingOpenCampaign) {
      return NextResponse.json(
        { message: "An open raise campaign already exists for this business." },
        { status: 400 }
      );
    }

    // If no open campaigns exist, create a new raise campaign entry with the provided data
    const newRequest = new RaiseCampaign({
      business_id,
      raised,
      shared_price,
      min_investment,
      max_investment,
      goal,
      description,
      files,
      start_date,
      end_date,
      status: status || "open", // Default to "open" if status is not provided
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "Raise campaign submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting raise campaign:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
