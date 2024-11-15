import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    try{
        await connect();
        const data = await RaiseCampaign.find().populate('business_id');
        const now = new Date()
        if (data) {
           // Check and update the status of each campaign
           for (const campaign of data) {
            if (campaign.end_date < now && campaign.status !== "closed") {
                campaign.status = "closed";
                await campaign.save(); // Save updated status
            }
        }
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
