// pages/api/investment/create.js
import connectDB from "@/lib/connectDB";
import Investment from "@/models/Investment";
import User from "@/models/user";
import Investor from "@/models/Investor";
import RaiseCampaign from "@/models/RaiseCampaign";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { investor_id, raisedcampaign_id, amount } = req.body;

  try {
    await connectDB();

    // Ensure investor and campaign exist
    const investor = await Investor.findById(investor_id);
    const campaign = await RaiseCampaign.findById(raisedcampaign_id);

    if (!investor || !campaign) {
      return res.status(404).json({ error: "Investor or Campaign not found" });
    }

    // Create new investment
    const newInvestment = new Investment({
      investor_id,
      raisedcampaign_id,
      amount,
    });

    await newInvestment.save();

    res.status(201).json({ message: "Investment created successfully", investment: newInvestment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
