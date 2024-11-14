"use client"
import { useState, useEffect } from "react";
import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB"
export default function Page({ params }) {
  const {id} = params;
  const [files, setFiles] = useState([])
  const [user_id, setUserId] = useState("")
  async function fetchData() {
    try {
      const response = await fetch(`/api/fetchingData/DataRoom/${id}`);
      const data = await response.json();
      
      const response1 = await fetch(`/api/fetchingData/getUserIdbyBusiness/${id}`);
      const business = await response1.json();
      setFiles(data.data.files || []);
      setUserId(business.user_id || "");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(()  => {
    fetchData()
  }, [])
  
  return(
    // OnUploadComplete={}
    <div className="flex overflow-hidden">
        <div className="flex ml-10 w-[40vw] h-screen">
        <DragAndDrop type="dataroom" className={"flex mt-44 bg-transparent justify-center h-screen w-screen"} onUploadComplete={fetchData}/>
        </div>

        <div className="absolute right-0 flex w-[40vw] h-screen bg-white shadow-lg  ">
            <div className="flex mt-20 ">
                <div className="ml-16 mt-5">
                    <h1 className="mb-3 text-2xl font-semibold">Data Room</h1>
                      {files.map((file,index)=>(
                        <FileContainer 
                          key={index} 
                          name={file.name} 
                          user_id={user_id}
                          file_path={file.file_path}
                          role="business"
                          />
                      ))
                      }
                </div>
            </div>
        </div>
    </div>
  );
};