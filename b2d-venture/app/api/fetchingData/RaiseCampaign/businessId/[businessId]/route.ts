import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }) {
    const { businessId } = params; // Extract businessId from the request params
    
    try {
        await connectDB(); // Connect to the database

        // Query RaiseCampaign using business_id instead of _id
        const data = await RaiseCampaign.find({ business_id: businessId })
            .populate('business_id') // Populate the business_id field with related data
            .lean(); // Convert MongoDB documents to plain JS objects
        
        if (data.length > 0) { // Check if campaigns were found
            return NextResponse.json({ data }); 
        }
        
        return NextResponse.json({ message: `No RaiseCampaign found for businessId: ${businessId}` });
        
    } catch (error) {
        return NextResponse.json({ message: error.message });  
    }  
}
