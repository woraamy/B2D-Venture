import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import InvestorRequest from "@/models/InvestorRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// Named export for the POST method
export async function POST(req: NextRequest) {
    try {
        await connectDB();  // Connect to the database
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthenticated, please log in", redirectToLogin: true },
                { status: 401 }
            );
          }
        const body = await req.json();  // Parse the JSON body
        const { investor_id, business_id, reason, consent } = body;
        console.log('Request body:', body);

        // Validate request body
        if (!investor_id || !business_id || !reason) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create a new investor request
        const newRequest = new InvestorRequest({
            investor_id,
            business_id,
            status_from_business: "pending",  // Set business status to pending
            status_from_admin: "pending",     // Set admin status to pending
            reason,
            consent
        });

        await newRequest.save();

        // Return a success response
        return NextResponse.json({ message: "Request created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        // Handle any errors during request creation
        return NextResponse.json({ message: "Failed to create request", error: error.message }, { status: 500 });
    }
}
