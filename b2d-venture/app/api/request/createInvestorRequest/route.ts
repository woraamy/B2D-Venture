
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/connectDB";
import InvestorRequest from "@/models/InvestorRequest";  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            await connectDB();  

            const { investor_id, business_id, status, reason } = req.body;

            if (!investor_id || !business_id || !status || !reason) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newRequest = new InvestorRequest({
                investor_id,
                business_id,
                status,
                reason,
            });

            await newRequest.save();

            res.status(201).json({ message: "Request created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to create request", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
