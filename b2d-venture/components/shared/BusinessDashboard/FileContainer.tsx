"use client"
import { MdDriveFolderUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import Business from "@/models/Business";
import User from "@/models/user";
import Link from "next/link";
export default function FileContainer({name,business_id,file_path}) {
    console.log(file_path)
    const [signedUrl, setSignedUrl] = useState(null);
    useEffect(() => {
        async function handleFetchUrl() {
            try {
              const response = await fetch(`/api/getUrl/670f5c99973784d0bbbc722f/dataroom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure you're setting this header
                },
                body: JSON.stringify({ fileName: file_path }),
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
    
    return (
        <div>
            {signedUrl && (
                 <div className="flex items-center mt-2 hover:text-blue-900 hover:cursor-pointer">
                    <Link href={signedUrl} className="flex items-center">
                        < FaFileAlt size={40} color="gray"/> 
                         <h1 className="ml-5">{name}</h1>
                    </Link>
                </div>
            )}
        </div>
    )
}