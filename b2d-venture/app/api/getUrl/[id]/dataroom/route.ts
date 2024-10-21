"use server"
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";

const dataroomBucket = process.env.DATAROOM_BUCKET_NAME;
const dataroom = new GoogleStorage(dataroomBucket);

export async function POST(req, {params}) { 
  const {id} = params;
  await connect();
    // authentication check
    const session = await getServerSession(authOptions);
      
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthentication' }, { status: 405 });
    }

    const email = session.user.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 405 });
    }

    if (user._id.toString() !== id){
        return NextResponse.json({ error: 'User not have permission to view this file' }, { status: 401 });
    }
    
    const { fileName } = await req.json();
    console.log(fileName)
    if (!fileName) {
        console.log(fileName)
       return NextResponse.json({ error: 'missing file name' }, { status: 400 });
    }
    console.log('Authen success')

    try {
        const signedUrl = await dataroom.getSignedUrl(fileName);
        return NextResponse.json({ signedUrl }); 
    
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.error()
    }
    }

