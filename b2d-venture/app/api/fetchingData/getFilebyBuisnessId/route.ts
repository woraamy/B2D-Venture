import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import File from "@/models/file";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");

  if (!businessId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const file = await File.find({ business_id: businessId, type: 'asset'});

    if (!file) {
      return NextResponse.json({ investor: null, message: "file not found" }, { status: 404 });
    }

    return NextResponse.json({ file }, { status: 200 });
  } catch (error) {
    console.error("Error fetching:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
