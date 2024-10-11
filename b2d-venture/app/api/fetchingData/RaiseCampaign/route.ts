import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    try{
        await connect();
        const data = await RaiseCampaign.find().populate('business_id').lean();
        if (data) {
            return NextResponse.json({ data }); 
        }
        return NextResponse.json({ message: `RaiseCampaign not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
