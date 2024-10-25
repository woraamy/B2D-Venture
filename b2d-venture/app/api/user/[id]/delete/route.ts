"use server"
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";

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
        return NextResponse.json({ user }); 
    
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.error()
    }
    }

