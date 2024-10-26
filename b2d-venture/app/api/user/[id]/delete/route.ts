"use server"
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";
import Investor from "@/models/Investor";
import Investment from '@/models/Investment';
import InvestorRequest from '@/models/InvestorRequest';
import Business from '@/models/Business';
import DataRoom from '@/models/DataRoom';
import File from '@/models/file';
import RaiseCampaign from '@/models/RaiseCampaign';

export async function POST(req, { params }) { 
    const { id } = params;
    await connect();

    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ error: 'User does not have permission to delete this file' }, { status: 403 });
    }
    console.log('Authentication successful');

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log('No user found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        console.log('User deleted successfully');

        if (user.role === "investor") {
            const investor = await Investor.findOne({ user_id: id });
            if (investor) {
                await Investment.deleteMany({ investor_id: investor._id });
                await InvestorRequest.deleteMany({ investor_id: investor._id });
                await Investor.deleteOne({ user_id: id });
            }
        } else if (user.role === "business") {
            const business = await Business.findOne({ user_id: id });
            if (business) {
                const dataroom = await DataRoom.findOne({ business_id: business._id });
                if (dataroom) {
                    await DataRoom.deleteOne({ business_id: business._id });
                    await File.deleteMany({ DataRoom_id: dataroom._id });
                }
                await Business.deleteOne({ user_id: id });
                await File.deleteMany({ business_id: business._id });
                await RaiseCampaign({business_id: business._id})
            }
        }

        return NextResponse.json({ message: 'User and related data deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Deleting error:', error);
        return NextResponse.json({ error: 'Failed to delete user and related data' }, { status: 500 });
    }
}
