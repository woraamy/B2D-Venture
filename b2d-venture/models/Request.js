import mongoose from "mongoose";
const Request = mongoose.Schema(
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
      amount: Integer,
      request_status: {
        type: String,
        enum: [approved, pending, declined]
        }  
    },
  );

  
  export default mongoose.models.Request || mongoose.model("Request", Request);
