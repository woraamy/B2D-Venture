import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: Request) {
    try{
        await connectDB();
        const data = await User.find();
        if (data) {
            return NextResponse.json({ data }); 
        }
        console.log(data);
        return NextResponse.json({ message: 'User not found' });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
