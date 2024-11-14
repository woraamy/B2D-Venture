import { NextResponse } from 'next/server';
import GoogleStorage from '@/lib/googleStorage';
import File from '@/models/file';
import connect from '@/lib/connectDB';
import User from '@/models/user';
import Business from '@/models/Business';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function DELETE(request, { params }) {

  const { id } = params;  // Extract the dynamic segment from the route

  if (!id) {
    return NextResponse.json({ error: 'ID is missing' }, { status: 400 });
  }

  console.log('Deleting file with ID:', id);

  await connect();
  const file = await File.findById(id) 
  const filePath = file.file_path
  const path = filePath.split("/");
  console.log(path)
  const business_id = path[5]
  const business = await Business.findById(business_id)
  const authenId = business.user_id.toString()
  
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

  if (user._id.toString() !== authenId ){
      console.log({'userId' : user._id.toString()})
      console.log({'authenId' : authenId})
      return NextResponse.json({ error: 'User not have permission to view this file' }, { status: 401 });
  }
  
  console.log(filePath)
  if (!filePath) {
      console.log(filePath)
      return NextResponse.json({ error: 'missing file' }, { status: 400 });
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

