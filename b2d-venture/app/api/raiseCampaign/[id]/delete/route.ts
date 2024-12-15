"use server"
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import RaiseCampaign from '@/models/RaiseCampaign';
import Investment from '@/models/Investment';



export async function DELETE(req, {params}) { 
  // id is raisecampaign id
  const {id} = params;
  await connect();
    // authentication check
    const session = await getServerSession(authOptions);
      
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthentication' }, { status: 405 });
    }

    if (session.user["role"] !== "admin"){
        return NextResponse.json({ error: 'User not have permission to view this file' }, { status: 401 });
    }
    console.log('Authen success')

    try {
        const campaign = await RaiseCampaign.findByIdAndDelete(id) 
        await Investment.deleteMany({raise_campaign_id:id})
        if (campaign.deletedCount === 1) {
          console.log('campaign and relate object deleted successfully');
        } else {
          console.log('No campaign found');
        }
        return NextResponse.json({ campaign }); 
    
    } catch (error) {
        console.error('Delete Error:', error);
        return NextResponse.error()
    }
    }

