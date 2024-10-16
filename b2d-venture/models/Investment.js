import mongoose from "mongoose";
import Investor from "@/models/Investor"
import RaiseCampaign from "./RaiseCampaign";
const InvestmentSchema = mongoose.Schema(
    {
      investor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: Investor
        },
      raise_campaign_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: RaiseCampaign 
        },
      amount: {
        type: Number,
        required: true
        },
      fee: {
        type: Number,
        require: true
      },
      created_at: { type: Date, default: Date.now },
    },
  );

  
  export default mongoose.models.Investment || mongoose.model("Investment", InvestmentSchema);
