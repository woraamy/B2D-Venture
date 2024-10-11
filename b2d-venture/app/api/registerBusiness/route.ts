import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest"; // Assuming you have a model for business requests
import User from "@/models/user";

// Handle POST request
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
      role,
      status,
    } = await req.json();

    // Connect to the database
    await connectDB();

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create a new business registration request
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
      status: "pending", // Request is pending approval by the admin
    });

    // Save the new request to the database
    await newRequest.save();
    console.log("Business registration request submitted successfully");

    // Return a success response
    return NextResponse.json(
      { message: "Business registration request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting business registration request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods (optional)
export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
