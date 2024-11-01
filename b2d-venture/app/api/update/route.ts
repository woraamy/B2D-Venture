import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { id, data, role } = await req.json();
    const updatedAccount = null;

    // Validate the user ID and data
    if (!id || !data || !role) {
        console.log('Investor ID:', id, 'Data:', data);
        console.log('Error:', { error: "User ID and data are required" });
      return NextResponse.json({ error: "User ID and data are required" }, { status: 400 });
    }

    // Find the investor by user ID and update their information
    
    if (role === "investor") {
        const updatedAccount = await Investor.findByIdAndUpdate(id, data, { new: true });
        console.log('Updating investor:', id, data);
        return NextResponse.json({ message: "Account updated successfully", investor: updatedAccount }, { status: 200 });
    }

    if (role === "business") {
        const updatedAccount = await Business.findByIdAndUpdate(id, data, { new: true });
        console.log('Updating business:', id, data);
        return NextResponse.json({ message: "Account updated successfully", business: updatedAccount }, { status: 200 });
    }

    if (role === "raisecampaign") {
        const updatedAccount = await RaiseCampaign.findByIdAndUpdate(id, data, {new: true});
        console.log('Updating raise campaign:', id, data);
        return NextResponse.json({ message: "Raise campaign updated successfully", campaign: updatedAccount }, { status: 200 });
    }



    if (!updatedAccount) {
      return NextResponse.json({ error: `${role} not found` }, { status: 404 });
    }


  } catch (error) {
    console.error("Error updating investor:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
