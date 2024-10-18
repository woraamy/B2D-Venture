import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
import User from "@/models/user";
import Business from "@/models/Business";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {


  try {
    // Parse the request body
    const {
      firstName,
      lastName,
      BusinessName,
      email,
      contactNumber,
      BusinessAddress,
      city,
      stateProvince,
      postalCode,
      country,
      typeOfBusiness,
      username,
      password,
      status,
    } = await req.json();

    // Log the incoming data to check for missing fields
    console.log("Request body:", {
      firstName,
      lastName,
      BusinessName,
      email,
      contactNumber,
      BusinessAddress,
      city,
      stateProvince,
      postalCode,
      country,
      typeOfBusiness,
      username,
      password,
      status,
    });

    // Connect to the database
    await connectDB();

    // If not approved, create a pending business registration request
    const newRequest = new BusinessRequest({
      firstName,
      lastName,
      BusinessName,
      email,
      contactNumber,
      BusinessAddress,
      city,
      stateProvince,
      postalCode,
      country,
      typeOfBusiness,
      username,
      password,
      role: "business",
      status: "pending", // Request is pending approval
    });

    // Save the new request to the database
    await newRequest.save();
    console.log("Business registration request submitted successfully");

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
