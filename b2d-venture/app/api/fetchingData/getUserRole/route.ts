import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import Business from "@/models/Business";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // Validate user ID
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectDB();

    // Check if user is an Investor
    const investor = await Investor.findOne({ user_id: userId });
    if (investor) {
      return NextResponse.json({ role: "investor" }, { status: 200 });
    }

    // Check if user is a Business
    const business = await Business.findOne({ user_id: userId });
    if (business) {
      return NextResponse.json({ role: "business" }, { status: 200 });
    }

    // If neither investor nor business found, return not found
    return NextResponse.json({ error: "User role not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
