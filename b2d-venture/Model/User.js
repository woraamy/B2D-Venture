import mongoose from "mongoose";
const User = mongoose.Schema(
    {
      username: String,
      password: String,
      email: String,
      role: String,
      contact_information: {
        type: Map,
        of: String,
      },
      status: {
        type: String,
        enum: ['active','pending','suspended']
      }
    },
    {
      timestamps: true,
    }
  );

  
  export default mongoose.models.User || mongoose.model("User", User);
