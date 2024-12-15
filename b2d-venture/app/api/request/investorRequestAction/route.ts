import { NextResponse } from 'next/server';
import connectDB from "@/lib/connectDB"; // Import your connectDB function
import InvestorRequest from "@/models/InvestorRequest"; 

export async function POST(req: Request) {
    try {
        const { id, type, action } = await req.json();

        await connectDB();

        // Find investor request by ID
        const request = await InvestorRequest.findById(id);

        if (!request) {
            console.log('Request not found');
            return NextResponse.json({ message: 'Request not found' }, { status: 404 });
        }

        // if type is admin, update status_from_admin
        if (type === 'admin') {

            if (action === 'allow') {
                request.status_from_admin = 'approved';
                await request.save(); 
                return NextResponse.json({ message: 'Request approved from admin' }, { status: 200 });

            } else if (action === 'reject') {
                request.status_from_admin = 'declined';
                await request.save(); 
                return NextResponse.json({ message: 'Request declined from admin' }, { status: 200 });

            } else {
                return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
            }
            
        // if type is business, update status_from_business
        } else if (type === 'business') {

            if (action === 'allow') {
                request.status_from_business = 'approved';
                await request.save(); 
                return NextResponse.json({ message: 'Request approved from admin' }, { status: 200 });

            } else if (action === 'reject') {
                request.status_from_business = 'declined';
                await request.save(); 
                return NextResponse.json({ message: 'Request declined from admin' }, { status: 200 });

            } else {
                return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
            }
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
