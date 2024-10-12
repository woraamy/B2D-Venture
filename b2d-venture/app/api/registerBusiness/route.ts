import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
import User from "@/models/user";
import Business from "@/models/business";

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

    if (status === "approved") {
      // Check if a user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 400 }
        );
      }

      // Create a new business user
      const newUser = new User({
        username,
        email,
        password,
        role: "business",
      });
      await newUser.save();

      // Create a new business record
      const newBusiness = new Business({
        user_id: newUser._id,
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
        status: "active",
      });
      await newBusiness.save();

      // Return success response
      return NextResponse.json(
        { message: "Business and user created successfully" },
        { status: 200 }
      );
    }

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
