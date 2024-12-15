"use server"
import { NextResponse } from "next/server";
function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
export async function POST(req){
    const { data, value, obj } = await req.json();
    console.log(value)

    if (!data || !obj) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Data must be an array" }, { status: 400 });
    }
    if (value === ""){
        return NextResponse.json(data, { status: 200 });
    }
    const queriedData = data.filter(item => {
        const propertyValue = getNestedProperty(item, obj); // Get nested property dynamically
        return propertyValue?.toLowerCase().includes(value.toLowerCase());
    });
    return NextResponse.json(queriedData, { status: 200 });
}