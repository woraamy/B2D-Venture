import { User } from "lucide-react";
import mongoose from "mongoose";
import { type } from "os";
const Business = mongoose.Schema(
    {
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'User'
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      BusinessName: { type: String, required: true },
      email: { type: String, required: true },
      contactNumber: { type: String },
      BusinessAddress: { type: String, required: true },
      city: { type: String, required: true },
      stateProvince: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      typeOfBusiness: { type: String },
      description: String,
      valuation: Number,
      shared_price: Number,
      status: {
        type: String,
        enum: ['active','pending','suspended']
      },
      contact_information: {
        type: Map,
        of: String,
      },
      raise_campaign: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"RaisedCampaign",
        }],
      tag_list: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Tag",
        }]
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.Business || mongoose.model("Business", Business);
