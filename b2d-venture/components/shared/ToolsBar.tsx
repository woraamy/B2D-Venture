
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
import ImageContainer from "./ImageContainer";
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
                <DialogContent className="flex max-w-[60vw] max-h-[70vh] flex-col bg-white">
                    <DialogHeader>
                    <DialogTitle>Upload or select picture</DialogTitle>
                    <DialogDescription>
                       Upload or select picture
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col h-[70vh]">
                        <div className="flex items-center overflow-hidden ml-[20%]">
                            <DragAndDrop type="asset" className='flex ml-1 h-[70vh]'/>
                        </div>
                        <ImageContainer />
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