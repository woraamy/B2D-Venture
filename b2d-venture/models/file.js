import mongoose from "mongoose";
const FileSchema = mongoose.Schema(
    {
      name: String,
      file_path: String,
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.FileSchema || mongoose.model("File", FileSchema);
