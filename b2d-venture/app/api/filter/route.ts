"use server"
import { NextResponse } from "next/server";

export async function POST(req) {
    const { data, tag, sort } = await req.json();
    console.log(tag)
    // console.log(sort)

    if (!data || (!tag && !sort)) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Data must be an array" }, { status: 400 });
    }

    let queriedData = data;

    if (tag.length > 0) {
        queriedData = queriedData.filter(item => 
            item.business_id.tag_list.includes(tag)
        );
    }

    if (sort != "Select sort value") {
        if (sort === "Newest") {
            queriedData = queriedData.sort((a, b) => 
                new Date(b.start_date) - new Date(a.start_date)
            );
        } else if (sort === "Popular") {
            queriedData = queriedData.sort((a, b) => b.raised - a.raised);
        } else if (sort === "Nearly close") {
            queriedData = queriedData.sort((a, b) => 
                new Date(a.end_date) - new Date(b.end_date)
            );
        }
    }

    // console.log(queriedData)
    
    return NextResponse.json(queriedData, { status: 200 });
}
