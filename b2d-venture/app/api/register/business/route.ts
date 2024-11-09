import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
import User from "@/models/user";
import Business from "@/models/Business";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };

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
      tag_list,
      username,
      password,
      status,
    } = await req.json();

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
      username,
      password,
      status,
    });

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

    // Retrieve the corresponding business request
    const businessRequest = await BusinessRequest.findOne({ email });

    if (!businessRequest) {
      return NextResponse.json(
        { message: "Business request not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(password);

    // Handle case where tag_list is an array
    const businessType = Array.isArray(tag_list)
      ? tag_list.join(", ")
      : tag_list;

    // Create a new business user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
      tag_list: businessType,
      username,
      status: "active",
    });
    await newBusiness.save();

    // Update the business request status to "done"
    const updatedRequest = await BusinessRequest.findOneAndUpdate(
      { email },                   // Find the business request by email
      { $set: { status: "done" } }, // Set status to "done"
      { new: true }                 // Return the updated document
    );

    // Log and verify if update was successful
    console.log("Updated business request:", updatedRequest);

    // Return success response
    return NextResponse.json(
      { message: "Business and user created successfully" },
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
