import InvestorRequest from "@/models/InvestorRequest";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request) {
    try{
        await connect();
        const data = await InvestorRequest.find()
        .populate({
            path: 'business_id',
            populate: { path: 'user_id' } 
        })
        .populate({
            path: 'investor_id',
            populate: { path: 'user_id' } 
        });

        if (data) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                createdAt: item.createdAt.toLocaleDateString('en-GB')
            }));
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `Investor request not found` },{status: 404});
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
