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

    const {
      id,
      type,
      email,
      action} = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const businessRequest = await BusinessRequest.findById(id);
    if (!businessRequest) {
      return NextResponse.json(
        { message: "Business request not found" },
        { status: 404 }
      );
    }

    if (action === "allow") {

      // Handle case where tag_list is an array
      const businessType = Array.isArray(businessRequest.tag_list)
        ? businessRequest.tag_list.join(", ")
        : businessRequest.tag_list;

      const newUser = new User({
        username: businessRequest.username,
        email: email,
        password: businessRequest.password,
        role: "business",
      });
      await newUser.save();

      const newBusiness = new Business({
        user_id: newUser._id,
        firstName: businessRequest.firstName,
        lastName: businessRequest.lastName,
        BusinessName: businessRequest.BusinessName,
        email: businessRequest.email,
        contactNumber: businessRequest.contactNumber,
        BusinessAddress: businessRequest.BusinessAddress,
        city: businessRequest.city,
        stateProvince: businessRequest.stateProvince,
        postalCode: businessRequest.postalCode,
        country: businessRequest.country,
        tag_list: businessRequest.tag_list,
        username: businessRequest.username,
        valuation: 0,
        status: "active",
      });
      await newBusiness.save();

      const updatedRequest = await BusinessRequest.findOneAndUpdate(
        { email },                   
        { $set: { status: "approved" } }, 
        { new: true }                
      );

      console.log("Updated business request:", updatedRequest);

      return NextResponse.json(
        { message: "Business and user created successfully" },
        { status: 200 }
      );
    }

    if (action === "reject") {
      const businessRequest = await BusinessRequest.findById(id);
      businessRequest.status = 'declined'
      businessRequest.save()
      console.log("Updated business reject request:", businessRequest);
      return NextResponse.json(
        { message: "Business request rejected" },
        { status: 200 }
      );
    }

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
