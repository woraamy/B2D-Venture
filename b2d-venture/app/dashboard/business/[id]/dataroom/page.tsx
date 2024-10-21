import { useState } from "react";
import DragAndDrop from "@/components/shared/DragAndDrop";
import Header from "@/components/shared/Header";
import InvestorSidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
export default function Page({params}) {
  const {id} = params
  return(

    <div className="flex">
        <div className="flex w-[40vw] h-screen">
        <DragAndDrop type="dataroom"/>
        </div>

        <div className="flex w-[40vw] h-screen justify-center items-center">
            <div className="flex bg-white w-[70%] h-[40%] rounded-xl shadow-lg border-2">
                <div className="ml-10 mt-5">
                    <h1 className="text-xl font-semibold">Data Room</h1>
                </div>
            </div>
        </div>
    </div>
  );
};