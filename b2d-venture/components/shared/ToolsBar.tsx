
import { 
        Bold, 
        Italic, 
        Underline, 
        AlignLeft, 
        AlignJustify, 
        AlignCenter, 
        AlignRight,
        Image
    } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
import { Toggle } from "@/components/ui/toggle"
import { useEditor } from "@tiptap/react"
import { useState } from "react";


  export default function ToolsBar({editor}) {
    
    if (!editor) return null;
    function uploadImage{
        
    }
    
    return (
        <div>
            
            <div className="border-2 w-full rounded-md">
                <Toggle 
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    pressed={editor.isActive("bold")}>
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle 
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    pressed={editor.isActive("italic")}>
                    <Italic className="h-4 w-4" />
                 </Toggle>
                 <Toggle 
                     onClick={() => editor.chain().focus().toggleUnderline().run()}
                     pressed={editor.isActive("underline")}>
                    <Underline className="h-4 w-4" />
                </Toggle>
                
                 <Toggle 
                     onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                     pressed={editor.isActive({ textAlign: "justify" })}>
                    <AlignJustify className="h-4 w-4"/>
                </Toggle>
                <Toggle  
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    pressed={editor.isActive({ textAlign: "left" })}>
                    <AlignLeft className="h-4 w-4"/>
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    pressed={editor.isActive({ textAlign: "center" })}>
                    <AlignCenter className="h-4 w-4"/>
                </Toggle>
                <Toggle 
                    onClick={() =>  editor.chain().focus().setTextAlign('right').run()}
                    pressed={editor.isActive({ textAlign: "right" })}>
                    <AlignRight className="h-4 w-4"/>  
                </Toggle>
                <Toggle  
                    onClick={() =>  editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    pressed={editor.isActive("heading", { level: 1 })}>
                    <Image className="h-4 w-4"/>  
                </Toggle>
                
                
            </div>
        </div>

    );
  }