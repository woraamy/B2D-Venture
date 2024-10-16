import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import Investment from "@/models/Investment";
import InvestorRequest from "@/models/InvestorRequest"
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connect();
        const data =await InvestorRequest.find({request_status: 'pending'})
        .populate('business_id')
        .sort({createdAt: -1 })
        .limit(3);

        if (data) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                createdAt: item.createdAt.toLocaleDateString() 
            }));
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `Investment ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
