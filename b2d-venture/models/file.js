import mongoose from "mongoose";
import DataRoom from "./DataRoom";

const FileSchema = mongoose.Schema(
    {
      dataroom_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref:'DataRoom'
        },
      name: String,
      file_path: String,
    },
    {
        timestamps: true,
      }
  );

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;
