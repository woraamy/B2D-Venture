import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import Investor from "@/models/investor";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields (username, email, password) are required." }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const newInvestor = await Investor.create({
      user_id: newUser._id,
      investment_history: [],
    });

    return NextResponse.json({ message: "User registered successfully.", userId: newUser._id, investorId: newInvestor._id }, { status: 201 });
  } catch (error) {
    console.error("Error during user registration:", error);

    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  }
}
