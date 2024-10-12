import mongoose from "mongoose";
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
        ref:File,
        }]
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.DataRoom || mongoose.model("DataRoom", DataRoomSchema);
