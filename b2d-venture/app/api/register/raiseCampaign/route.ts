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
      status, // Now considering status sent from frontend
    } = await req.json();

    // Connect to the database
    await connectDB();

    // Create a new raise campaign entry with the provided data
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
      status: status || "open",
    });

    await newRequest.save();

    // console.log(newRequest);
    // console.log("Raise campaign submitted successfully");

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
