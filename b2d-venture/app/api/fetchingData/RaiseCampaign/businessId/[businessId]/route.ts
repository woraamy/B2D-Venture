import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }) {
    const { businessId } = params; // Extract businessId from the request params
    
    try {
        await connectDB(); 
        
        const data = await RaiseCampaign.find({ business_id: businessId })
        .populate({
                path: 'business_id',
                populate: {
                    path: 'user_id',
                },
            }) 
            console.log("raise campaign " + data);

        if (data.length > 0) { 
            return NextResponse.json(data); 
        }

        
        
        return NextResponse.json({ data: null });
        
    } catch (error) {
        return NextResponse.json({ message: error.message });  
    }  
}