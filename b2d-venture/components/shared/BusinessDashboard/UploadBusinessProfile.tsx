"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function UploadBusinessProfile({business_id}) {
  const [data, setData] = useState("")
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function fetchData(){
    const response = await fetch(`/api/fetchingData/Business/${business_id}`);
    const res = await response.json();
    setData(res.data.profile || "");
}

useEffect(()  => {
  fetchData()
}, [])

  // Handle file selection
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  }

  // Handle file upload
  async function handleUploadProfile() {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(`/api/file/upload/${business_id}/profile?role=business`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsUpload(true);
        toast.success("File uploaded successfully")
        fetchData()
        console.log("File uploaded successfully");
      } else {
        const errorData = await response.json();
        toast.error("Failed to upload the file:")
        console.error("Failed to upload the file:", errorData.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  if (isUpload) return <p>File uploaded successfully!</p>;

  return (
    <div>
      <Toaster />
      <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-5">Profile Picture</label>

            {data ? (
              <img
                src={data}
                alt="Profile preview"
                className="w-52 h-52 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-52 h-52 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
           
           

      <div className="flex">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.png,.pdf" // restrict to certain file types (optional)
        />
        <Button onClick={handleUploadProfile} disabled={!file} className="w-1/2 ">
          Upload Profile
        </Button>
      </div>   
      
      </div >
    </div>
  );
}

