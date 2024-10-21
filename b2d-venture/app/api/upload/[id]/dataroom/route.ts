import { UploadFile } from '@/lib/googleStorageAction';
import GoogleStorage from '@/lib/googleStorage';
import { NextResponse } from 'next/server';
import File from '@/models/file';
import DataRoom from '@/models/DataRoom';
import connect from '@/lib/connectDB';


const dataroomBucket = process.env.DATAROOM_BUCKET_NAME;
const dataroom = new GoogleStorage(dataroomBucket);

export async function POST(req: Request, { params }) {
    const form = await req.formData();
    const { id } = params;
    await connect();

    try {
        const file = form.getAll('files');
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        let dataroomData = await DataRoom.findOne({ business_id: id });
        if (!dataroomData) {
            // Create a new DataRoom if none exists
            dataroomData = new DataRoom({
                business_id: id,
                files: []
            });
            await dataroomData.save();
        }
        const uploadResult = [];
        for (const i of file){
            const existingFile = await File.findOne({
                dataroom_id: dataroomData._id.toString(),
                name: i.name
            });
            if (existingFile) {
                return NextResponse.json({ error: `File ${i.name} already exists in the dataroom.` }, { status: 400 });
            }
            const fileData = new File({
                name: i.name,
                file_path: `${id}/${file.name}`, // Set this based on your upload logic
                dataroom_id: dataroomData._id.toString()
            });
            await fileData.save();
            dataroomData.files.push(fileData)
            await dataroomData.save();
    
            const success = await dataroom.uploadFile(i as File,id);
            uploadResult.push(success)
        }
       
        return NextResponse.json({ uploadResult });
    } catch (error) {
        console.error('Error parsing the file:', error);
        return NextResponse.json({ error: 'Error parsing the file' }, { status: 500 });
    }
}
