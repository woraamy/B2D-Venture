import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import Investment from "@/models/Investment";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connect();
        const data = await Investment.find({'investor_id': id })
        .populate({
            path: 'raise_campaign_id',
            populate: {path: 'business_id'}
        })
        .sort({ created_at: -1 })

        if (data) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                created_at: item.created_at.toLocaleDateString() 
            }));
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `Investment ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
