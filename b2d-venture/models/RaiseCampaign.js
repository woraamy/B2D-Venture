import mongoose from "mongoose";
const RaisedCampaign = mongoose.Schema(
    {
      name: String,
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Business'
        },
      target_raise: String,
      description: String,
      minimum_investment: Number,
      start_date: Date,
      end_date : Date
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.RaisedCampaign || mongoose.model("RaisedCampaign", RaisedCampaign);
