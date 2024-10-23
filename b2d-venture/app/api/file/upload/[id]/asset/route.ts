import { UploadFile } from '@/lib/googleStorageAction';
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import File from '@/models/file';
import DataRoom from '@/models/DataRoom';
import connect from '@/lib/connectDB';


const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function POST(req: Request, { params }) {
    const form = await req.formData();
    // id is business
    const { id } = params;
    await connect();

    try {
        const file = form.getAll('files');
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        const uploadResult = [];
        for (const i of file){
            const existingFile = await File.findOne({
                business_id: id.toString(),
                name: i.name,
                type: 'asset'
            });
            if (existingFile) {
                return NextResponse.json({ error: `File ${i.name} already exists in the asset.` }, { status: 400 });
            }
            const filePath = `business/${id}/post/${i.name}`
            const url = await asset.getPublicUrl(filePath)
            const fileData = new File({
                name: i.name,
                file_path: url, 
                business_id: id.toString(),
                type: 'asset'
            });
            await fileData.save();
    
            const success = await asset.uploadFile(i as File,filePath);
            uploadResult.push(success)
        }
       
        return NextResponse.json({ uploadResult });
    } catch (error) {
        console.error('Error parsing the file:', error);
        return NextResponse.json({ error: 'Error parsing the file' }, { status: 500 });
    }
}
