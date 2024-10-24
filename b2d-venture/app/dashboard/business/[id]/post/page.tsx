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
  const files = dataroom.files || []
  const business = await Business.findById(id)
  const user_id = business.user_id.toString()
  
  return(
    <div className="flex">
        <div className="flex w-[40vw] h-screen">
        <DragAndDrop type="asset"/>
        </div>
    </div>
  );
};