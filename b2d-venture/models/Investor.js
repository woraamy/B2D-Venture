import mongoose from "mongoose";
import User from "./user";
const InvestorSchema = mongoose.Schema(
    {
      name: String,
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: User
        },
      investor_description: String,
      profile_picture: String,
      email: String,
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      contactNumber: String,
      birthDate: {
        type: Date,
      },
      nationality: {
        type: String,
      },  
    },
    {
        timestamps: true,
      }
  );

  const data = mongoose.models.Investor || mongoose.model("Investor", InvestorSchema);

  export default data
