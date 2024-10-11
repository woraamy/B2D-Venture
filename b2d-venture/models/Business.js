import mongoose from "mongoose";
const Business = mongoose.Schema(
    { 
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref:'User'},
      name: String,
      description: String,
      valuation: Number,
      coverimg: String,
      profile: String,
      status: {
        type: String,
        enum: ['active','pending','suspended']
      },
      contact_information: {
        type: Map,
        of: String,
      },
      tag_list: [{
        type: String
        }]
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.Business || mongoose.model("Business", Business);
