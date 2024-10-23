import Investment from "@/models/Investment";
import connect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    const { id } = params;  // Extract the ID

    try {
        await connect();  // Connect to the database

        // Fetch investments by raise_campaign_id or investor_id
        const data = await Investment.find({
            $or: [
                { 'investor_id': id },
                { 'raise_campaign_id': id }
            ]
        })
        .populate({
            path: 'raise_campaign_id',
            populate: { path: 'business_id' }
        })
        .populate({
            path: 'investor_id',  // Populate investor_id
            populate: { path: 'user_id' }  // Also populate the user_id inside investor_id
        })
        .sort({ created_at: -1 });

        if (data && data.length > 0) {
            // Format the created_at date before sending
            const formattedData = data.map(item => ({
                ...item.toObject(),
                created_at: item.created_at.toLocaleDateString()
            }));
            return NextResponse.json({ data: formattedData });
        }

        return NextResponse.json({ message: `No Investments found for ID: ${id}` });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
