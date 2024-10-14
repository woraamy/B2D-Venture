import mongoose, { Schema } from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      email: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['admin','investor','business'],
        default: 'investor'
      },
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.models.User || mongoose.model("User", userSchema);

  export default User;  
