import mongoose from "mongoose";
import File from "./file"
import Business from "./Business"
const DataRoomSchema = mongoose.Schema(
    {
      name: String,
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Business'
        },
      files: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"File",
        }]
    },
    {
        timestamps: true,
      }
  );

const DataRoom = mongoose.models.DataRoom || mongoose.model('DataRoom', DataRoomSchema);

export default DataRoom;  
