import { UploadFile } from '@/lib/googleStorageAction';
import GoogleStorage from '@/lib/googleStorage';
import { NextApiRequest, NextApiResponse } from 'next';

const dataroomBucket = process.env.DATAROOM_BUCKET_NAME;
const dataroom = new GoogleStorage(dataroomBucket);

export async function POST(req, res) {
    const form = await req.formData();
    try {  

    const file = form.get('file') as File;
    const success = await dataroom.uploadFile(file);
    return Response.json({success: success});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error parsing the file' });
    }

}