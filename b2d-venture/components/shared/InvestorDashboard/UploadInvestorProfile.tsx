"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


export default function UploadInvestorProfile({investor_id}) {
  const [data, setData] = useState("")
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function fetchData(){
    const response = await fetch(`/api/fetchingData/Investor/${investor_id}`);
    const res = await response.json();
    setData(res.data.profile_picture || "");
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
      const response = await fetch(`/api/file/upload/${investor_id}/profile?role=investor`, {
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
      <label className="font-medium text-gray-700 ">Profile Picture</label>
      {data ? (
            <img
                src={data}
                alt="Profile preview"
                className="w-52 h-52 mt-5 rounded-full object-cover mb-4"
            />
            ) : (
            <div className="w-52 h-52 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <span className="text-gray-400 mt-5">No image</span>
            </div>
            )}
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg,.png,.pdf" // restrict to certain file types (optional)
      />
      <Button onClick={handleUploadProfile} disabled={!file}>
        Upload Profile
      </Button>
    </div>
  );
}
