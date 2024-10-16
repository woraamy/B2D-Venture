import mongoose from "mongoose";
import Investor from "@/models/Investor"
import RaiseCampaign from "./RaiseCampaign";
const InvestmentSchema = mongoose.Schema(
    {
      investor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:'Investor' 
        },
      raise_campaign_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:'RaisedCampaign' 
        },
      amount: {
        type: Number,
        required: true
        },
      fee: {
        type: Number,
        required: true
        },
      created_at: {
        type: Date,
        default: Date.now
      },
    },
  );

  
  export default mongoose.models.Investment || mongoose.model("Investment", InvestmentSchema);
