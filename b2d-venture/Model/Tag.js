import mongoose from "mongoose";
const DataRoom = mongoose.Schema(
    {
      tag_name: String,
    },
  );

  
  export default mongoose.models.DataRoom || mongoose.model("DataRoom", DataRoom);
