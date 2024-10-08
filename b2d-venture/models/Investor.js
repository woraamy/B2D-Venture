import mongoose from "mongoose";
const Investor = mongoose.Schema(
    {
      name: String,
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'User'
        },
      investor_description: String,
      profile_picture: String,
      investment_history: [{
        type:mongoose.Schema.Types.ObjectId, ref:investment
        }],
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
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

  
  export default mongoose.models.Investor || mongoose.model("Investor", Investor);
