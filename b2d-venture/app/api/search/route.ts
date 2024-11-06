"use server"
import { NextResponse } from "next/server";
export async function POST(req){
    const { searchParams } = new URL(req.url);
    const data = searchParams.get("data");
    const value = searchParams.get("query");
    const obj= searchParams.get("obj");
    if (!data || !value || !obj) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Data must be an array" }, { status: 400 });
    }
    const queriedData = data.filter(item => item.obj.toLowerCase().includes.include(value.toLowerCase()))
    return NextResponse.json(queriedData, { status: 200 });
}