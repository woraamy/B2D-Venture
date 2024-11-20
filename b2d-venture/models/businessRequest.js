import mongoose from "mongoose";

const businessRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  BusinessName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String },
  BusinessAddress: { type: String, required: true },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  tag_list: { type: [String], required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "declined", "done"], default: "pending" },  // Tracks the status of the request
  createdAt: { type: Date, default: Date.now },
  description: {type: String}
});

const BusinessRequest = mongoose.models.BusinessRequest || mongoose.model("BusinessRequest", businessRequestSchema);
export default BusinessRequest;
