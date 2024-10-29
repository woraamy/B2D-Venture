import { useState } from "react";
import DragAndDrop from "@/components/shared/BusinessDashboard/DragAndDrop";
import Header from "@/components/shared/Header";
import InvestorSidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import File from "@/models/file";
import DataRoom from "@/models/DataRoom";
import Business from "@/models/Business";
import connect from "@/lib/connectDB"
import User from "@/models/user"
export default async function Page({ params }) {
  const {id} = params;
  await connect();
  const dataroom = await DataRoom.findOne({'business_id':id}).populate('files')
  const files = dataroom ? dataroom.files || [] : [];
  const business = await Business.findById(id)
  const user_id = business.user_id.toString()
  
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