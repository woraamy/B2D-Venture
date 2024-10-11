import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/connectDB';
import BusinessRequest from '@/models/businessRequest'; // Assuming you have a model for business requests
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
      // Get the email from search parameters (Next.js app directory uses searchParams)
      const email = req.nextUrl.searchParams.get('email');
  
      if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
      }
  
      // Connect to the database
      await connectDB();
  
      // Find the business request by email
      const businessRequest = await BusinessRequest.findOne({ email });
  
      if (!businessRequest) {
        return NextResponse.json({ message: "Business request not found" }, { status: 404 });
      }
  
      // Return the status of the business request
      return NextResponse.json({ businessRequest: businessRequest }, { status: 200 });
  
    } catch (error) {
      console.error("Error fetching business request status:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
