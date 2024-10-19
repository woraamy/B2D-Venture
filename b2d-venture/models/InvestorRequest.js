import mongoose from "mongoose";
const InvestorRequestSchema = mongoose.Schema(
    {
      investor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Investor' 
        },
      business_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Business' 
        },
      status: {
        type: String,
        enum: ["approved", "pending", "declined"]
        },
      reason: String,
      createdAt: { type: Date, default: Date.now },
    },
  );

  const data = mongoose.models.InvestorRequest || mongoose.model("InvestorRequest", InvestorRequestSchema);
  export default data