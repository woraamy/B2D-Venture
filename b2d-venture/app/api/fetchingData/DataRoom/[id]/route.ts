
import connect from "@/lib/connectDB";
import DataRoom from "@/models/DataRoom";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    const { id } = params; 
    try {
        await connect();
 
        const data = await DataRoom.findOne({'business_id':id}).populate('files')
        if (data) {
            return NextResponse.json({ data });
        }

        console.warn(`dataroom with business ID ${id} not found`);
        return NextResponse.json({ message: `Dataroom with business ${id} not found` }, { status: 404 });
        
    } catch (error) {
        console.error("Error fetching :", error);
        return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
    }
}
