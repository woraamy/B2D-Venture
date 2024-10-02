import mongoose from "mongoose";
const Company = mongoose.Schema(
    {
      name: String,
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'User'
        },
      company_name: String,
      description: String,
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.Company || mongoose.model("Company", Company);
