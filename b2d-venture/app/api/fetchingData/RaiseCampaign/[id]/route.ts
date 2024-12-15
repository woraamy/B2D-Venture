
import RaiseCampaign from "@/models/RaiseCampaign";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connectDB();
        const data = await RaiseCampaign.findById(id).populate('business_id').lean();
        if (data) {
            
            // Format the created_at date before sending
            const formattedData = {
                ...data,
                start_date: new Date(data.start_date).toLocaleDateString('en-GB'),
                end_date: new Date(data.end_date).toLocaleDateString('en-GB')
            };
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `RaiseCampaign ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
