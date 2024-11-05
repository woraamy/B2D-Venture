import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: NextRequest) {

  try {
    // Parse the request body
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

    // If not approved, create a pending business registration request
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
        status,
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "Business registration request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting business registration request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
