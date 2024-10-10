import mongoose from "mongoose";
const Tag = mongoose.Schema(
    {
      name: String,
    },
  );

  
  export default mongoose.models.Tag || mongoose.model("Tag", Tag);
