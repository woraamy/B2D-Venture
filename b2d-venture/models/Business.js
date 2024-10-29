import mongoose from "mongoose";
import User from "./user"

const BusinessSchema = mongoose.Schema(
    { 
      name: String,
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref:'User'},
      firstName: String,
      lastName:  String,
      email: String,
      BusinessName: String,
      contactNumber: String,
      BusinessAddress: String,
      city: String,
      stateProvince: String,
      postalCode: String,
      country: String,
      description: String,
      valuation: Number,
      coverimg: String,
      profile: String,
      tag_list: [{
        type: String
         }],
      status: {
        type: String,
        enum: ['active','pending','suspended']
      }
    },
    {
        timestamps: true,
      }
  );

  const business = mongoose.models.Business|| mongoose.model("Business", BusinessSchema);
  export default business

