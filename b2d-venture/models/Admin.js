import mongoose from "mongoose";
import User from "./user"

const AdminSchema = mongoose.Schema(
    {
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        ref: User},
      request_list: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:Request
        }],
    },
    {
      timestamps: true,
    }
  );

  
  export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
