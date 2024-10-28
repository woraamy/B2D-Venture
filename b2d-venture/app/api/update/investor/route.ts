import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { userId, data } = await req.json();

    // Validate the user ID and data
    if (!userId || !data) {
      return NextResponse.json({ error: "User ID and data are required" }, { status: 400 });
    }

    // Find the investor by user ID and update their information
    const updatedInvestor = await Investor.findByIdAndUpdate(userId, data, { new: true });

    if (!updatedInvestor) {
      return NextResponse.json({ error: "Investor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Investor updated successfully", investor: updatedInvestor }, { status: 200 });
  } catch (error) {
    console.error("Error updating investor:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
