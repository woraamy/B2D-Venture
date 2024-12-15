import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export async function GET(req: Request, {params}) {
    const {id} = params;
    try{
        await connectDB();
        const data = await User.findById(id);
        if (data) {
            return NextResponse.json({ data }); 
        }
        console.log(data);
        return NextResponse.json({ message: 'User not found' });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}
