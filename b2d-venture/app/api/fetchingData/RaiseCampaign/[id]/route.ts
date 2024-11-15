import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connectDB();
        const data = await RaiseCampaign.findById(id).populate('business_id').lean();
        if (data) {
            const now = new Date(); 
            if(data.end_date < now){
                data.status = "closed"
                data.save()
            }
            // Format the created_at date before sending
            const formattedData = {
                ...data,
                start_date: new Date(data.start_date).toLocaleDateString('en-US'),
                end_date: new Date(data.end_date).toLocaleDateString('en-US')
            };
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `RaiseCampaign ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
