import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/connectDB";
import BusinessRequest from "@/models/businessRequest"  // Assuming you have a model for business requests
import User from "@/models/user";

// API handler to register a business
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await connectDB();

  if (req.method === "POST") {
    const { firstName, lastName, BusinessName, email, contactNumber, BusinessAddress, city, stateProvince, postalCode, country, typeOfBusiness, username, password } = req.body;

    try {
      // Check if user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      // Save business registration request to the database
      const newRequest = new BusinessRequest({
        firstName,
        lastName,
        BusinessName,
        email,
        contactNumber,
        BusinessAddress,
        city,
        stateProvince,
        postalCode,
        country,
        typeOfBusiness,
        username,
        password,
        status: "pending",  // Request is pending approval by the admin
      });

      await newRequest.save();

      // Send response back to the client
      res.status(200).json({ message: "Business registration request submitted successfully" });

    } catch (error) {
      console.error("Error submitting business registration request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
