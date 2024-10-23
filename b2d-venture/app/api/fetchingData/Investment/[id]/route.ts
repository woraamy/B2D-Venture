import Business from "@/models/Business";
import RaiseCampaign from "@/models/RaiseCampaign";
import Investment from "@/models/Investment";
import connect from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request, { params }) {
    const { id } = params;  // Extract the ID (could be either investor_id or raise_campaign_id)

    try {
        await connect();  // Connect to the database

        // Fetch investments either by investor_id or raise_campaign_id
        const data = await Investment.find({
            $or: [
                { 'investor_id': id },  // Match by investor_id
                { 'raise_campaign_id': id }  // Match by raise_campaign_id
            ]
        })
        .populate({
            path: 'raise_campaign_id',
            populate: { path: 'business_id' }
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
