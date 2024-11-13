
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
    DialogFooter,
    DialogClose
    } from "@/components/ui/dialog"
import { Toggle } from "@/components/ui/toggle"
import { useEditor } from "@tiptap/react"
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import DragAndDrop from "./BusinessDashboard/DragAndDrop";
export default function ToolsBar({editor}) {
    
    if (!editor) return null;
    function uploadImage(){
        
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
                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-0">
                        <Image className="h-4 w-4"/>  
                   </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center justify-center h-[500px]">
                    <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                    </DialogHeader>
                    <div>
                        <DragAndDrop type="asset" className=''/>
                    </div>
                    <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
                
                
            </div>
        </div>

    );
  }