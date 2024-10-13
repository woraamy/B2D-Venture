import mongoose from "mongoose";
const InvestmentSchema = mongoose.Schema(
    {
      investor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Investor' 
        },
      raise_campaign_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'RaisedCampaign' 
        },
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Business' 
        },
      amount: {
        type: Number,
        required: true
        },
      fee: {
        type: Number,
        require: true
      }
    },
  );

  
  export default mongoose.models.Investment || mongoose.model("Investment", InvestmentSchema);
