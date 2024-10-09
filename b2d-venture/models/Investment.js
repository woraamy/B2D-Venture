import mongoose from "mongoose";
const Investment = mongoose.Schema(
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
      amount: {
        type: Number,
        required: true
        },
    },
  );

  
  export default mongoose.models.Investment || mongoose.model("Investment", Investment);
