import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import InvestorRequest from "@/models/InvestorRequest";

// Named export for the POST method
export async function POST(req: NextRequest) {
    try {
        await connectDB();  // Connect to the database

        const body = await req.json();  // Parse the JSON body
        const { investor_id, business_id, reason } = body;
        console.log('Request body:', body);

        // Validate request body
        if (!investor_id || !business_id || !reason) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create a new investor request
        const newRequest = new InvestorRequest({
            investor_id,
            business_id,
            status: "pending",  // Set status to pending
            reason,
        });

        await newRequest.save();

        // Return a success response
        return NextResponse.json({ message: "Request created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to create request", error: error.message }, { status: 500 });
    }
}
