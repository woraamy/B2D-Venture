"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { Toaster } from "react-hot-toast";
import RegisterInvestor from "@/components/shared/Register_investor";
export default function page(){
    const router = useRouter();
    const [data, setData] = useState([]);
    const [formValidated, setFormValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    // async function handleSubmit(e){
    //     e.preventDefault()
    //     const formData = new FormData(e.target);
    //     const response = await fetch(`/api/raiseCampaign/${id}/edit`, {
    //         method: 'POST',
    //         body: formData,
    //     });
    
    //     const result = await response.json();
    //     if (response.ok) {
    //         toast.success("Edit raise campaign success!");  
    //         router.push('/dashboard/admin/campaign');  
    //     } else {
    //         toast.error(result.error || 'Failed to edit raise campaign'); 
    //     }
    // }

    const handleFormValidated = (isValid: boolean) => {
        if (isValid) {
          setSubmitted(true); // Set the submitted state to true when form is valid
          setFormValidated(true);
        
        } else {
          setFormValidated(false);
        }
      };
     
    return (
        <div className="flex justify-center items-center w-[85vw] ">
            <Toaster />
            <RegisterInvestor onFormValidated={handleFormValidated} />
            {/* <div className="flex flex-col justify-center items-center bg-white w-[60%] h-[50%] rounded-xl shadow-lg p-48">
            
            
            </div> */}
    </div>
    )
}