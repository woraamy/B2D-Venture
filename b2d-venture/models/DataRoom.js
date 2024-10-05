import mongoose from "mongoose";
const DataRoom = mongoose.Schema(
    {
      name: String,
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Business'
        },
      file_name: String,
      file_path: String,
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.DataRoom || mongoose.model("DataRoom", DataRoom);
