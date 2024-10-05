import mongoose, { Schema } from "mongoose";
const userSchema = mongoose.Schema(
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

  const User = mongoose.models.User || mongoose.model("User", userSchema);

  export default User;  
