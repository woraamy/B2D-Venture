import mongoose from "mongoose";
import DataRoom from "./DataRoom";
import Business from "./Business"
import { Fascinate } from "next/font/google";

const FileSchema = mongoose.Schema(
    {
      dataroom_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref:'DataRoom'
        },
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref:'Business'
        },
      name: String,
      file_path: String,
      type: { type: String, enum: ["dataroom", "asset"] }
    },
    {
        timestamps: true,
      }
  );

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;
