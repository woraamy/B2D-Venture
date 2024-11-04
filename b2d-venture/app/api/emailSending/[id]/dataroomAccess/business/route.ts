import { NextResponse, NextRequest } from 'next/server'
import InvestorRequest from '@/models/InvestorRequest';

const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req, {params}) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const web = process.env.NEXT_PUBLIC_API_URL;
    
    const {id} = params
    // id is investorRequest id
    const email = req.nextUrl.searchParams.get('email');
   
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {

            user: username,
            pass: password
        }
    });
    try {
        const request = await InvestorRequest.findById(id)
            .populate("business_id")
            .populate("investor_id");
        console.log(request)
        if (!request) {
            return NextResponse.json({ message: 'Investor request not found' }, { status: 404 });
        }
        
        const status = request.status_from_business
        const link = `${web}/dashboard/admin/${request.business_id._id}`
        const message = `<p>Investor ${request.investor_id.firestName} have been send ${request.business_id.BusinessName}'s data room access request. You can see more detail here </p> <a href='${link}'>Link</a>`
    
        
        const mail = await transporter.sendMail({
            from: username,
            to: email,
            subject: `Investor ${request.investor_id.firestName} send ${request.business_id.BusinessName}'s data room access request `,
            html: `
                <p>Dear ${request.business_id.firstName || "anonymous"}</p>
                <div>${message}</div>
            `,
        })
        return NextResponse.json({ status: 'success', message: 'Email sent successfully' }, { status: 200 });
    }
    catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
    }
}