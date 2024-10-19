import mongoose from "mongoose";
import Business from "./Business"
const RaisedCampaignSchema = mongoose.Schema(
    {
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: Business
        },
      target_raise: String,
      min_investment: Number,
      max_investment: Number,
      shared_price: Number,
      raised: Number,
      goal: Number,
      start_date: Date,
      end_date : Date
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.RaisedCampaign || mongoose.model("RaisedCampaign", RaisedCampaignSchema);
