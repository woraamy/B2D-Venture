import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const investor = await Investor.findOne({ user_id: userId });

    if (!investor) {
      return NextResponse.json({ investor: null, message: "Investor not found" }, { status: 404 });
    }

    return NextResponse.json({ investor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching investor:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
