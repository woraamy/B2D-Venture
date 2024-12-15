import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export async function GET() {
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
