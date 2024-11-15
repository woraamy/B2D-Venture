import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import { BsSendDash } from "react-icons/bs";
export async function GET(req: Request) {
    try{
        await connectDB();
        const data = await User.find();
        if (data) {
            const formattedData = data.map(item => ({
                ...item.toObject(),
                createdAt:  new Date(item.createdAt).toLocaleDateString('en-GB')
            }));
            return NextResponse.json({ data: formattedData });
        }
        return NextResponse.json({ message: 'User not found' });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
