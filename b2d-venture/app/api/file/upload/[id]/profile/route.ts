import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import File from '@/models/file';
import DataRoom from '@/models/DataRoom';
import connect from '@/lib/connectDB';
import Investor from '@/models/Investor';
import Business from '@/models/Business';

const assetBucket = process.env.ASSET_BUCKET_NAME;
const asset = new GoogleStorage(assetBucket);

export async function POST(req: Request, { params }) {
    const form = await req.formData();
    // id is business or investor
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    await connect();
    
    try {
        const file = form.get('files');
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }
        if (role == 'investor'){
            const investor = Investor.findById(id)
            const oldUrl = investor.profile
            const oldUrlArray = oldUrl.split("/");
            const oldName = oldUrlArray[oldUrlArray.lenght() - 1]
            const result = await asset.deleteFile(`investor/${id}/${oldName}`);
            const filePath = `investor/${id}/${file.name}`
            const url = await asset.getPublicUrl(filePath)
            investor.profile = url
            await investor.save();
            const uploadResult = await asset.uploadFile(file as File,filePath);
            return NextResponse.json({ uploadResult });

        }else if(role == 'business'){
            const business = Business.findById(id)
            const oldUrl = business.profile
            const oldUrlArray = oldUrl.split("/");
            const oldName = oldUrlArray[oldUrlArray.lenght() - 1]
            const result = await asset.deleteFile(`business/${id}/${oldName}`);
            const filePath = `business/${id}/${file.name}`
            const url = await asset.getPublicUrl(filePath)
            business.profile = url
            await business.save();
            const uploadResult = await asset.uploadFile(file as File,filePath);
            return NextResponse.json({ uploadResult });

        } else {
            return NextResponse.json({ error: 'Wrong Role' }, { status: 500 });
        }
        
    } catch (error) {
        console.error('Error parsing the file:', error);
        return NextResponse.json({ error: 'Error parsing the file' }, { status: 500 });
    }
}
