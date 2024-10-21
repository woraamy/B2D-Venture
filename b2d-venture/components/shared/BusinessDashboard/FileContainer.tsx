"use client"
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FileContainer({name,user_id,file_path}) {
    console.log(file_path)
    const [signedUrl, setSignedUrl] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        async function handleFetchUrl() {
            try {
              const response = await fetch(`/api/file/getUrl/${user_id}/dataroom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ filePath: file_path }),
              });
              if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
              }
              const data = await response.json();
              setSignedUrl(data.signedUrl);
            } catch (error) {
              console.error('Failed to fetch URL:', error);
              setSignedUrl(null); 
            }
          };
          handleFetchUrl();
    },[])

    async function handleDelete(){
      try{
        const response = await fetch(`/api/file/delete/${user_id}/dataroom`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ filePath: file_path })
        })
        if (response.ok) {
          setIsDeleted(true); 
          console.log("File deleted successfully");
        } else {
          throw new Error("Failed to delete the file");
        }
      } catch (error) {
        console.error("Failed to delete file:", error);
      }
    }
    if (isDeleted) return null;
    return (
        <div>
            {signedUrl && (
                 <div className="flex items-center mt-2 hover:text-blue-900 hover:cursor-pointer">
                    <Link href={signedUrl} className="flex items-center">
                        < FaFileAlt size={40} color="gray"/> 
                         <h1 className="ml-5">{name}</h1>
                    </Link>
                    <Button className="ml-10 shadow-md"
                      onClick={handleDelete}>
                      <MdDelete />
                      delete
                    </Button>
                </div>
            )}
        </div>
    )
}