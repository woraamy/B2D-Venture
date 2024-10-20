'use server';
import { Storage } from '@google-cloud/storage';
import GoogleStorage from './googleStorage';

const dataroomBucket = process.env.DATAROOM_BUCKET_NAME;
const assetBucket = process.env.ASSET_BUCKET_NAME;

const dataroom = new GoogleStorage(dataroomBucket);
const asset = new GoogleStorage(assetBucket);

export const UploadFile = async (form: FormData, type: String) => {
    try {  
        if (type=="dataroom"){
            const file = form.get('file') as File;
            await dataroom.uploadFile(file);
        }else{
            const file = form.get('file') as File;
            await asset.uploadFile(file);
        }
   
    } catch (error) {
        console.error(error);
        return false;
    }
  }
  
export const GetPublicUrl = async (fileName: String, type: String) => {
    try {
        let url = "";
        if (type === "dataroom" && dataroom){
             url = dataroom.getPublicUrl(fileName);
        }else if (type === "asset" && asset){
             url = asset.getPublicUrl(fileName);
        } else {
        throw new Error(`Unknown type: ${type}`);
      }
        return url
    } catch (error) {
        console.error(error);
        return error;
    }
}