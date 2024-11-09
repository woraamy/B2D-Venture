"use server"
import { NextResponse } from "next/server";
function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
export async function POST(req) {
    const { data, tag, sort , obj, timeKey} = await req.json();

    if (!data || (!tag && !sort)) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Data must be an array" }, { status: 400 });
    }

    let queriedData = data;

    if (tag.length > 0) {
        tag.forEach((tagItem) => {
            queriedData = queriedData.filter(item => {
                const propertyValue = getNestedProperty(item, obj); // Get nested property dynamically
                return propertyValue && propertyValue.includes(tagItem);
            })
        });
        
    }
    if (sort != "Select sort value" || sort === "" ) {
        if (sort === "Newest") {
            queriedData = queriedData.sort((a, b) => 
                b[timeKey] - a[timeKey]
            );
        } else if (sort === "Popular") {
            queriedData = queriedData.sort((a, b) => b.raised - a.raised);
        } else if (sort === "Nearly close") {
            queriedData = queriedData.sort((a, b) => 
                a.end_date - new b.end_date
            );
        } else if (sort === "Oldest") {
            queriedData = queriedData.sort((a, b) => 
                a[timeKey] - b[timeKey]
            );
        }
    }

    
    return NextResponse.json(queriedData, { status: 200 });
}
