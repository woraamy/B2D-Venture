import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
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
      description,
      tag_list,
      username,
      password,
      status,
    } = await req.json();

    await connectDB();

    const hashedPassword = await hashPassword(password);

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
      description,
      tag_list,
      username,
      password: hashedPassword,
      role: "business",
      status: "pending", // Request is pending approval
    });

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
