import { NextResponse, NextRequest } from 'next/server'
import InvestorRequest from '@/models/InvestorRequest';
import BusinessRequest from '@/models/businessRequest';
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req, {params}) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const web = process.env.NEXT_PUBLIC_API_URL;

    const {id} = params
    // id is businessRequest id
   
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
        const request = await BusinessRequest.findById(id)
        console.log(request)
        if (!request) {
            return NextResponse.json({ message: 'Business request not found' }, { status: 404 });
        }
        
        let message;
        const status = request.status
        if (status === "approved"){
            const link = `${web}/login`
            message = `<p>We are pleased to inform you that your recent request to create business has been approved! you can already login with this link</p> <a href='${link}'>Login</a>`
        
        } else{
            message = `<p>Thank you for submitting your request. After careful review, we regret to inform you that your request to create business has been declined.</p>`
        }
        const mail = await transporter.sendMail({
            from: username,
            to: request.email,
            subject: `Your request has been ${status}`,
            html: `
                <p>Dear ${request.firstName || "anonymous"}</p>
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