import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: NextRequest) {
    console.log("ma laew");


  try {
    // Parse the request body
    const {
      business_id,
      rasied,
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

    // Log the incoming data to check for missing fields
    console.log("Request body:", {
        business_id,
        rasied,
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

    // Connect to the database
    await connectDB();

    // If not approved, create a pending business registration request
    const newRequest = new RaiseCampaign({
        business_id,
        min_investment,
        max_investment,
        goal,
        description,
        files,
        start_date,
        end_date,
        status,
    });

    // Save the new request to the database
    await newRequest.save();
    console.log("Raise campaign created successfully");

    // Return success response
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

// Handle unsupported methods
export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
