import BusinessRequest from "@/models/businessRequest";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request) {
    try{
        await connect();
        const data =await BusinessRequest.find()
        .populate('business_id')
        .sort({createdAt: -1 })

        if (data) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                createdAt: item.createdAt.toLocaleDateString() 
            }));
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `Business request not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}