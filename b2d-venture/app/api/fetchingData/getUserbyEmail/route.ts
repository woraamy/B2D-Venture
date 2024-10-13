import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
import User from "@/models/user";

// Handler to check if a user exists by email
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await connectDB();

    // Find the user in the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ user: null, message: "User not found" }, { status: 404 });
    }

    // Return the found user
    // console.log(user);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
