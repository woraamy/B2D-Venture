import Investor from "@/models/Investor";
import connect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    const { id } = params; 
    try {
        await connect();

        let data = await Investor.findById(id).lean();
        
        if (data) {
            return NextResponse.json({ data });
        }

        data = await Investor.findOne({ user_id: id }).lean();
        
        if (data) {
            return NextResponse.json({ data });
        }

        return NextResponse.json({ message: `Investor with ID ${id} not found` }, { status: 404 });
        
    } catch (error) {
        return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
    }
}
