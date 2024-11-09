import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    try{
        await connect();
        const data = await RaiseCampaign.find().populate('business_id');
        if (data) {
           // Format the created_at date before sending
           const formattedData = data.map(item => ({
            ...item.toObject(),
            start_date: new Date(item.start_date).toLocaleDateString('en-US'),
            end_date: new Date(item.end_date).toLocaleDateString('en-US')
            }));
            return NextResponse.json({ data: formattedData });
        }
        return NextResponse.json({ message: `RaiseCampaign not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
