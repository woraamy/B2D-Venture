import { useState } from "react";
import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import Header from "@/components/shared/Header";
import InvestorSidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import File from "@/models/file";
import DataRoom from "@/models/DataRoom";
import business from "@/models/Business";
import connect from "@/lib/connectDB"
export default async function Page({ params }) {
  const {id} = params;
  await connect();
  const dataroom = await DataRoom.findOne({'business_id':id}).populate('files')
  const files = dataroom.files || []
  
  return(
    <div className="flex">
        <div className="flex w-[40vw] h-screen">
        <DragAndDrop type="dataroom"/>
        </div>

        <div className="absolute right-0 flex w-[40vw] h-screen bg-white shadow-lg  ">
            <div className="flex mt-20 ">
                <div className="ml-16 mt-5">
                    <h1 className="mb-3 text-2xl font-semibold">Data Room</h1>
                      {files.map((file,index)=>(
                        <FileContainer key={index} name={file.name} />
                      ))
                      }
                </div>
            </div>
        </div>
    </div>
  );
};