import mongoose from "mongoose";
import User from "./user";
const InvestorSchema = mongoose.Schema(
    {
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: User
        },
      investor_description: String,
      profile_picture: String,
      investment_history: [{
        type:mongoose.Schema.Types.ObjectId, ref:"Investment"
        }],
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
