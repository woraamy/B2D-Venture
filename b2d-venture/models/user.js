import mongoose from "mongoose";
const User = mongoose.Schema(
    {
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      role: {
        type: String,
      },
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
