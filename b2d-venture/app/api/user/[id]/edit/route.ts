"use server"
import { NextResponse } from 'next/server';
import connect from '@/lib/connectDB';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import User from "@/models/user";

export async function POST(req, { params }) { 
    const { id } = params;
    await connect();
    const form = await req.formData();
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ error: 'User does not have permission to delete this file' }, { status: 403 });
    }
    console.log('Authentication successful');

    try {
        const role = form.get("role");
        const name = form.get("name");
        const email = form.get("email");
        const user = await User.findById(id);
        if (!user) {
            console.log('No user found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        user.role = role;
        user.username = name;
        user.email = email;
        await  user.save()
        console.log("Edit User successful")
        return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Deleting error:', error);
        return NextResponse.json({ error: 'Failed to edit user ' }, { status: 500 });
    }
}
