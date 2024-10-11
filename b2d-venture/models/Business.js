import { User } from "lucide-react";
import mongoose from "mongoose";
import { type } from "os";
const businessSchema = mongoose.Schema(
    {
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        unique: true, 
        ref:'User'
      },
      firstName: { type: String },
      lastName: { type: String },
      BusinessName: { type: String },
      email: { type: String },
      contactNumber: { type: String },
      BusinessAddress: { type: String },
      city: { type: String },
      stateProvince: { type: String },
      postalCode: { type: String },
      country: { type: String },
      typeOfBusiness: { type: String },
      description: String,
      valuation: Number,
      status: {
        type: String,
        enum: ['active','pending','suspended']
      },
      tag_list: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Tag",
        }]
    },
    {
        timestamps: true,
      }
  );

  const Business = mongoose.models.Business || mongoose.model("Business", businessSchema);

  export default Business;
