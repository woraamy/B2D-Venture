"use server"
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import RaiseCampaign from '@/models/RaiseCampaign';

const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function POST(req, {params}) { 
  // id is raisecampaign id
  const {id} = params;
  await connect();
    // authentication check
    const session = await getServerSession(authOptions);
      
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthentication' }, { status: 405 });
    }

    if (session.user.role !== "admin"){
        return NextResponse.json({ error: 'User not have permission to view this file' }, { status: 401 });
    }
    console.log('Authen success')

    try {
        const campaign = await RaiseCampaign.deleteById(id) 
        if (campaign.deletedCount === 1) {
          console.log('campaign deleted successfully');
        } else {
          console.log('No campaign found');
        }
        return NextResponse.json({ campaign }); 
    
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.error()
    }
    }

