"use server"
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";
import File from "@/models/file"

const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function POST(req, {params}) { 
  // id is userid
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
    
    const { filePath } = await req.json();
    console.log(filePath)
    if (!filePath) {
        console.log(filePath)
       return NextResponse.json({ error: 'missing file name' }, { status: 400 });
    }
    console.log('Authen success')

    try {
        const result = await asset.deleteFile(filePath);
        const file = await File.deleteOne({file_path:filePath}) 
        if (file.deletedCount === 1) {
          console.log('Document deleted successfully');
        } else {
          console.log('No document found with that file_path');
        }
        return NextResponse.json({ result }); 
    
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.error()
    }
    }

