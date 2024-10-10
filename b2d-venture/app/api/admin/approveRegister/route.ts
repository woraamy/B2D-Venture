import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    const { requestId, approve } = req.body;  // Request ID and approval status (true/false)

    try {
      const request = await BusinessRequest.findById(requestId);

      if (!request) {
        return res.status(404).json({ message: "Business request not found" });
      }

      if (approve) {
        // If approved, create the business user in the system
        const hashedPassword = await bcrypt.hash(request.password, 10);

        const newUser = new User({
          username: request.username,
          email: request.email,
          password: hashedPassword,
          role: "business",
        });

        await newUser.save();
        request.status = "approved";
      } else {
        request.status = "rejected";
      }

      await request.save();

      res.status(200).json({ message: `Request has been ${approve ? "approved" : "rejected"}` });

    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
