import InvestorRequest from "@/models/InvestorRequest";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request) {
    try{
        await connect();
        const data = await InvestorRequest.find()
        .sort({createdAt: -1 })

        if (data) {
            return NextResponse.json({ data: data });
    }
        return NextResponse.json({ message: `Investor request not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
