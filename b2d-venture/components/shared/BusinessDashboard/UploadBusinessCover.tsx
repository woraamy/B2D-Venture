"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function UploadBusinessCover({business_id}) {
  const [data, setData] = useState("")
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function fetchData(){
    const response = await fetch(`/api/fetchingData/Business/${business_id}`);
    const res = await response.json();
    setData(res.data.coverimg || "");
}

useEffect(()  => {
  void fetchData()
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
      const response = await fetch(`/api/file/upload/${business_id}/cover`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsUpload(true);
        window.location.reload(); 
        console.log("File uploaded successfully");

      } else {
        const errorData = await response.json();
        console.error("Failed to upload the file:", errorData.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  if (isUpload) return <p>File uploaded successfully!</p>;

  return (
    <div>
      <label className="font-medium text-gray-700 ">Cover Picture</label>
      {data ? (
                <img
                  src={data}
                  alt="Profile preview"
                  className="w-96 h-52 mt-5 object-cover mb-4"
                />
              ) : (
                <div className="w-80 h-44 mt-5 bg-gray-200 mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
       <div className="flex">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.png,.pdf" // restrict to certain file types (optional)
        />
        <Button onClick={handleUploadProfile} disabled={!file}>
          Upload Cover Image
        </Button>
        </div> 
    </div>
  );
}
