import { Toggle } from "@/components/ui/toggle"
import { useEditor } from "@tiptap/react"
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import DragAndDrop from "./BusinessDashboard/DragAndDrop";
import Image from "next/image";

export default function ImageContainer() {


return (
    <div>
        <div className="flex">
            
            <div className="relative h-[20%] w-auto">
                    <Image
                        src='https://storage.googleapis.com/b2d-venture/business/6707993e22c345724e722e5a/cover.png'
                        alt="Cover Image"
                        fill={true}
                        style={{ objectFit: "cover" }}
                    />
                </div>
        </div>
    </div>

);
}