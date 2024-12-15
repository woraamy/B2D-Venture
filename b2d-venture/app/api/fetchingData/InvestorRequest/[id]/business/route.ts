
import InvestorRequest from "@/models/InvestorRequest"
import connect from "@/lib/connectDB";
import { NextResponse} from "next/server";
export async function GET(req: Request, { params }) {
    const { id } = params;
    try{
        await connect();
        const data =await InvestorRequest.find({'business_id': id})
        .populate('investor_id')
        .sort({createdAt: -1 })

        if (data) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                createdAt: item.createdAt.toLocaleDateString('en-GB') 
            }));
            return NextResponse.json({ data: formattedData });
    }
        return NextResponse.json({ message: `Request ${id} not found` });
    } catch (error){
        return NextResponse.json({ message: error });  
    }  
}