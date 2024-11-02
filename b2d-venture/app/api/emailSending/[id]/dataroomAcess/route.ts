import { NextResponse, NextRequest } from 'next/server'
import InvestorRequest from '@/models/InvestorRequest';

const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req, {params}) {
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
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

        if (!request) {
            return NextResponse.json({ message: 'Investor request not found' }, { status: 404 });
        }
        
        let message;
        const status = request.status_from_business
        if (status === "allow"){
            const link = `${web}/dashboard/investor/${request.investor_id._id}/sharedInformation/file`
            message = `We are pleased to inform you that your recent request to ${request.business_id.BusinessName} has been approved! you can see information in this link <Link href='${link}'>Link</Link>`
        
        } else{
            message = `Thank you for submitting your request. After careful review, we regret to inform you that your request to ${request.business_id.BusinessName} has been declined.`
        }
        const mail = await transporter.sendMail({
            from: username,
            to: email,
            subject: `Your request has been ${request.business_id.BusinessName}`,
            html: `
                <p>Dear ${request.investor_id.name}</p>
                <p>${message}</p>
            `,
        })
        return NextResponse.json({ status: 'success', message: 'Email sent successfully' }, { status: 200 });
    }
    catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
    }
}