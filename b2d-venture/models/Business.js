import mongoose from "mongoose";
const BusinessSchema = mongoose.Schema(
    { 
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref:'User'},
      firstName: String,
      lastName:  String,
      c: String,
      email: String,
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
        }]
    },
    {
        timestamps: true,
      }
  );

  const business = mongoose.models.Business|| mongoose.model("Business", BusinessSchema);
  export default business
