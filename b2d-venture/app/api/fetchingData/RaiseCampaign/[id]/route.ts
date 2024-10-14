import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connect();
        const data = await RaiseCampaign.findById(id).populate('business_id').lean();
        if (data) {
            return NextResponse.json({ data }); 
        }
        return NextResponse.json({ message: `RaiseCampaign ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
