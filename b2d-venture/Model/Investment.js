import mongoose from "mongoose";
const Investment = mongoose.Schema(
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
      amount: {
        type: Number,
        required: true
        },
      payment_status: {
        type: String,
        enum: [completed, failed]
        }  
    },
  );

  
  export default mongoose.models.Investment || mongoose.model("Investment", Investment);
