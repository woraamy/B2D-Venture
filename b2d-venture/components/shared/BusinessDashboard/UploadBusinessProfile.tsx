"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadBusinessProfile({business_id}) {
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
      {/* File input and upload button */}
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
