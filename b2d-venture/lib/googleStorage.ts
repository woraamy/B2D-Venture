'use server';

import { Storage, Bucket} from '@google-cloud/storage';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

const keyFile = JSON.parse(process.env.KEY_FILE);
const projectId = process.env.PROJECT_ID;

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

  getPublicUrl(fileName:String) {
    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`
  }

  async uploadFile(file:File,businessId:string){
    if (!file){
      throw new Error('No file provieded'); 
    }
    if (file.size < 1){
      throw new Error('File is empty');
    }
    try {
      const filePath = `${businessId}/${file.name}`;
      const buffer = await file.arrayBuffer();
      await this.bucket.file(filePath).save(Buffer.from(buffer))
      return true
    } catch (error) {
      console.log(error)
      return false 
    }
  }

}

export default GoogleStorage;