import mongoose from "mongoose";
const RequestSchema = mongoose.Schema(
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
      request_status: {
        type: String,
        enum: ["approved", "pending", "declined"]
        },
      reason: String,
      createdAt: { type: Date, default: Date.now },
    },
  );

  
  export default mongoose.models.Request || mongoose.model("Request", RequestSchema);
