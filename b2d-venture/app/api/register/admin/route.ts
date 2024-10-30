"use server"
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";
import toast from 'react-hot-toast';
import bcrypt from "bcryptjs";
import { Password } from 'primereact/password';

export async function POST(req) { 
    await connect();
    const form = await req.formData();
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ error: 'User does not have permission' }, { status: 403 });
    }
    console.log('Authentication successful');

    try {
        const name = form.get("name");
        const pass1 = form.get("password1")
        const pass2 = form.get("password2")
        const email = form.get("email");

        if (pass1 != pass2){
            toast.error("User key different password")
            return NextResponse.json({ error: 'User key different password' }, { status: 403 });
        }
        const hashedPassword = await bcrypt.hash(pass1, 10);
        const user = new User({ 
            role: "admin",
            username: name,
            password: hashedPassword,
            email: email
        })
        await user.save();
        console.log("create Admin User successful")
        return NextResponse.json({ message: 'User create successfully' }, { status: 200 });

    } catch (error) {
        console.error('Deleting error:', error);
        return NextResponse.json({ error: 'Failed to create user ' }, { status: 500 });
    }
}
