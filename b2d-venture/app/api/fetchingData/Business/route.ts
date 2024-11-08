import Business from "@/models/Business";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    try{
        await connect();
        const data = await Business.find();
        if (data) {
            return NextResponse.json({ data: data });
        }
        return NextResponse.json({ message: `Business not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
