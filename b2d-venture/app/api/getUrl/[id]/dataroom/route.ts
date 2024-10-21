import { UploadFile } from '@/lib/googleStorageAction';
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import File from '@/models/file';
import DataRoom from '@/models/DataRoom';
import connect from '@/lib/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";

const dataroomBucket = process.env.DATAROOM_BUCKET_NAME;
const dataroom = new GoogleStorage(dataroomBucket);

export async function POST(req: NextApiRequest, res: NextApiResponse, {params}) {
    const {user_id} = params

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
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

    if (user._id !== user_id){
        return NextResponse.json({ error: 'User not have permission to view this file' }, { status: 401 });
    }
    
    const { fileName } = req.body;
    if (!fileName) {
       return res.status(400).json({ error: 'Missing fileName' });
    }

    try {
        const signedUrl = await dataroom.getSignedUrl(fileName);
        res.status(200).json({ url: signedUrl });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ error: 'Failed to generate signed URL' });
    }
    }

