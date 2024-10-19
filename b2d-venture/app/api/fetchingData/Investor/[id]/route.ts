import Investor from "@/models/Investor";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connect();
        const data = await Investor.findById(id).lean();
        if (data) {
            return NextResponse.json({ data }); 
        }
        return NextResponse.json({ message: `RaiseCampaign ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
