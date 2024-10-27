"use server"
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";
import RaiseCampaign from '@/models/RaiseCampaign';
import Business from '@/models/Business';

export async function POST(req, { params }) { 
    const { id } = params;
    await connect();
    const form = await req.formData();
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ error: 'User does not have permission' }, { status: 403 });
    }
    console.log('Authentication successful');

    try {
        const name = form.get("name");
        const description = form.get("description")
        const valuation = form.get("valuation")
        const min = form.get("min")
        const max = form.get("max")
        const start = form.get('start')
        const end = form.get('end')

        const raise = await RaiseCampaign.findById(id);
        const business = await Business.findById(raise.business_id)
        if (!raise) {
            console.log('Not found');
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        business.BusinessName = name;
        business.description = description;
        business.valuation = valuation;
        raise.min_investment = min;
        raise.max_investment = max;
        raise.start_date = start;
        raise.end_date = end;
        await business.save()
        await raise.save()
        console.log("Edit raise campaign successful")
        return NextResponse.json({ message: 'Raise campaign updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Deleting error:', error);
        return NextResponse.json({ error: 'Failed to edit raise campaign ' }, { status: 500 });
    }
}
