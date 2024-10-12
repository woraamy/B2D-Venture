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
      admin_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref:'Admin' 
        },
      request_status: {
        type: String,
        enum: ["approved", "pending", "declined"]
        },
      request_type: {
        type: String,
        enum: ["ask_information"]
        },
    },
    {
        timestamps: true,
      }
  );

  
  export default mongoose.models.Request || mongoose.model("Request", RequestSchema);
