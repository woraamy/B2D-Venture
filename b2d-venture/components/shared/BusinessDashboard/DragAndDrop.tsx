"use client";
import { MdDriveFolderUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';

export default function DragAndDrop({type, className}) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const businessId = pathParts[3];

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  async function handleSubmitFile(e: any) {
    e.preventDefault();

    if (files.length === 0) {
      console.log("No files selected for upload.");
      return; // No file has been submitted
    } 
    console.log(type)
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('files', file);
    });
    setIsLoading(true);
    try{

      const res = await fetch(`/api/file/upload/${businessId}/${type}`, {
        method: 'POST',
        body: formData,
      })
      if (res.status === 400) {
        toast.error("Already upload this file");
      }
      if (!res.ok){
        throw new Error('Upload failed.');
      }

      const result = await res.json();
      toast.success('File uploaded successfully!');
      
      console.log('Upload successful:', result);
      // reset after successful
      setFiles([]);
    } catch(error){
      console.error('Error uploading files:', error);
    } finally{
      setIsLoading(false);
    }

  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className={className}>
    <div className="flex mt-44 bg-transparent justify-center h-screen w-screen">
      <Toaster />
      <div className="flex bg-white items-center h-[50%] w-[80%] rounded-xl shadow-lg border-2">
      <form
        className={`${
          dragActive ? "bg-gray-200" : "bg-transparent"
        }  p-4 w-1/3 h-1/2 ml-10 rounded-lg border-2  border-orange-500 border-dashed min-h-[10rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <div>
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />
        <div className="w-[100%] flex items-center justify-center">
        <MdDriveFolderUpload  size={70} color="gray"/>
        </div>
        <p className="mt-2">
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        </div>
      </form>
      <div className="relative flex flex-col p-3 ml-10 self-stretch mt-16 h-[70%] w-[50%] ">
        
        <h1 className="text-xl font-semibold mb-5">Uploaded File</h1>
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row items-center space-x-5">
              <span>
                <FaFileAlt />
              </span>
              <span>{file.name}</span>
              <span
                className="text-red-500 flex ml-10 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                <MdDelete />
              </span>
            </div>
          ))}
          {isLoading && (
          <div className=" absolute bottom-0  w-full flex items-center justify-center">
            <img
                src="/assets/icons/icons-loading.gif"
                alt="loading"
                className="object-contain"
              />
            <div className="loader">Loading...</div> 
          </div>
          )}
          <button
          className="absolute bottom-0 bg-orange-500 rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
          >
          <span className="p-2 text-white">Submit</span>
        </button>
        </div>
     
    
      </div>

    </div>
    </div>
  );
}