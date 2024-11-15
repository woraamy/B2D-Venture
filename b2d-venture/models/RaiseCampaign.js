import mongoose from "mongoose";
import Business from "./Business"
import { description } from "@/components/charts/overviewchart";
const RaisedCampaignSchema = mongoose.Schema(
    {
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: Business
        },
      target_raise: String,
      min_investment: Number,
      max_investment: Number,
      shared_price: Number,
      raised: Number,
      goal: Number,
      start_date: Date,
      end_date : Date,
      status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"  
      },
      description: String,
      team_member: [],
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.RaisedCampaign || mongoose.model("RaisedCampaign", RaisedCampaignSchema);
