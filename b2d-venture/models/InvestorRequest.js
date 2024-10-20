import mongoose from "mongoose";

const InvestorRequestSchema = new mongoose.Schema(
  {
    investor_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      unique: false,
      ref: "Investor" 
    },
    business_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      unique: false,
      ref: "Business" 
    },
    status: {
      type: String,
      enum: ["approved", "pending", "declined"],
      default: "pending"  
    },
    reason: {
      type: String,
      required: true,  
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,  
  }
);

const InvestorRequest = mongoose.models.InvestorRequest || mongoose.model("InvestorRequest", InvestorRequestSchema);
export default InvestorRequest;
