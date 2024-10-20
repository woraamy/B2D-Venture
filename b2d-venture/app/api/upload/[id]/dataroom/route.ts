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
        const file = form.get('files');
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

        // Check for existing file with the same dataroom_id and file name
        const existingFile = await File.findOne({
            dataroom_id: dataroomData._id.toString(),
            name: file.name
        });

        if (existingFile) {
            return NextResponse.json({ error: 'File with this name already exists in the dataroom.' }, { status: 400 });
        }

        const fileData = new File({
            name: file.name,
            file_path: "", // Set this based on your upload logic
            dataroom_id: dataroomData._id.toString()
        });
        await fileData.save();

        const success = await dataroom.uploadFile(file as File);
        return NextResponse.json({ success });
    } catch (error) {
        console.error('Error parsing the file:', error);
        return NextResponse.json({ error: 'Error parsing the file' }, { status: 500 });
    }
}
