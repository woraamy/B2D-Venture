import { 
        Bold, 
        Italic, 
        Underline, 
        AlignLeft, 
        AlignJustify, 
        AlignCenter, 
        AlignRight,
        Image,
        Link,
        Heading
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
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import ImageContainer from "./ImageContainer";
import DragAndDrop from "./BusinessDashboard/DragAndDrop";
export default function ToolsBar({editor, id}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData(){
        const response = await fetch(`/api/fetchingData/getFile?id=${id}`);
        const data = await response.json();
        setData(data.file || []);
    }
    useEffect(()  => {
        fetchData()
        setIsLoading(false)
      }, [])
    

    if (!editor) return null;

    
    const handleSubmit = (selectedImages) => {
        setIsDialogOpen(false);
        selectedImages.forEach((item) => {
            editor.chain().focus().setImage({ src: item.file_path }).run()
        })                
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
                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                     pressed={editor.isActive("heading")}>
                    <Heading className="h-4 w-4"/>
                </Toggle>
                <Toggle 
                     onClick={() => editor.chain().focus().toggleLink().run()}
                     pressed={editor.isActive("link")}>
                    <Link className="h-4 w-4"/>
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-0" onClick={() => setIsDialogOpen(true)}>
                        <Image className="h-4 w-4"/>  
                   </Button>
                </DialogTrigger>
                <DialogContent className="flex max-w-[60vw] max-h-[95vh] flex-col bg-white">
                    <DialogHeader>
                    <DialogTitle>Image Preview and Selection</DialogTitle>
                    <DialogDescription>
                       Upload and select image
                    </DialogDescription>
                    </DialogHeader>
                         <div className="flex flex-col w-[63vw]">
                        {/* Drag and Drop */}
                            <DragAndDrop
                                type="asset"
                                className="h-[60vh] shadow-none"
                                onUploadComplete={fetchData}
                        />
                        {/* Image Container */}
                        <h1 className="-mt-[20%] font-semibold text-lg">Select Image</h1>
                        <div className="mt-2 overflow-auto">
                            {isLoading ? 
                                <div className="absolute bottom-5 left-1/4 w-full flex items-center justify-center">
                                    <img
                                    src="/assets/icons/icons-loading.gif"
                                    alt="Loading"
                                    className="object-contain"
                                    />
                                    <div className="loader">Loading...</div>
                                </div> 
                            :<ImageContainer data={data} onSubmit={handleSubmit} setIsDialogOpen={setIsDialogOpen} onDelete={fetchData}/>
                        }
                        </div>
                        </div>
                        
                    
                </DialogContent>
                </Dialog>
                
            </div>
        </div>

    );
  }