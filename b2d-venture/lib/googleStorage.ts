import { Storage, Bucket} from '@google-cloud/storage';
import fs from 'fs';

const port = process.env.PORT;
const keyFile = JSON.parse(process.env.KEY_FILE);
const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;

class GoogleStorage {
    storage: Storage;
    bucketName: string;
    bucket: Bucket;
    constructor(bucketName) {
        this.storage = new Storage({
            projectId: projectId,
            credentials: keyFile 
            });
        this.bucketName = bucketName;
        this.bucket = this.storage.bucket(bucketName);
     }

  getPublicUrl(fileName) {
    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`
  }

}

export default GoogleStorage;
