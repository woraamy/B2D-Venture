import Business from "@/models/Business";
import connect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    const { id } = params; 
    try {
        // Log the incoming request ID
        console.log(`Received request for business ID: ${id}`);
        
        await connect();

        // Try to find investor by ID first
        let data = await Business.findById(id).lean();
        if (data) {
            console.log(`Business found by ID: ${data}`);
            return NextResponse.json({ data });
        }

        // Try to find investor by user_id if not found by ID
        data = await Business.findOne({ user_id: id }).lean();
        if (data) {
            console.log(`Business found by user_id: ${data}`);
            return NextResponse.json({ data });
        }

        // If no data found
        console.warn(`Business with ID ${id} not found`);
        return NextResponse.json({ message: `Business with ID ${id} not found` }, { status: 404 });
        
    } catch (error) {
        console.error("Error fetching business:", error);
        return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
    }
}
