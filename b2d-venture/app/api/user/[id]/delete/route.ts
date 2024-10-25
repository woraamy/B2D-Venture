"use server"
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";
import Investor from "@/models/Investor"
import Investment from '@/models/Investment';
import InvestorRequest from '@/models/InvestorRequest';
import Business from '@/models/Business';
import DataRoom from '@/models/DataRoom';
import File from '@/models/file';

const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function POST(req, {params}) { 
  // id is user id
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
        const user = await User.deleteById(id) 
        if (user.deletedCount === 1) {
          console.log('user deleted successfully');
        } else {
          console.log('No user found');
        }
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
              const dataroom = await DataRoom.findOne({ business_id: business._id })
              if (dataroom){
                await DataRoom.deleteOne({ business_id: business._id }); 
                await File.deleteMany({ DataRoom_id: dataroom._id });
              }
              await Investor.deleteOne({ user_id: id });
              await File.deleteMany({ business_id: business._id });
          }
      }
      
      return NextResponse.json({ message: 'User and related data deleted successfully' });
    
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.error()
    }
    }

