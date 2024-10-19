import { NextResponse } from 'next/server';
import connectDB from "@/lib/connectDB"; // Import your connectDB function
import InvestorRequest from "@/models/InvestorRequest"; // Import your InvestorRequest model
import BusinessRequest from "@/models/businessRequest"; // Import your BusinessRequest model

export async function POST(req: Request) {
    try {
        const { id, type, action } = await req.json();

        await connectDB();

        let request;

        if (type === 'investor') {
            request = await InvestorRequest.findById(id);
        } else if (type === 'business') {
            request = await BusinessRequest.findById(id);
        }

        if (!request) {
            console.log('Request not found');
            return NextResponse.json({ message: 'Request not found' }, { status: 404 });
        }

        if (action === 'allow') {
            request.status = 'approved';
            await request.save(); 
            console.log('Request approved');
            return NextResponse.json({ message: 'Request approved' }, { status: 200 });
        } else if (action === 'reject') {
            request.status = 'declined';
            await request.save(); 
            return NextResponse.json({ message: 'Request declined' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
