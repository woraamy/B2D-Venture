"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
    } from "@/components/ui/dialog"

type Props = {
    link: string;
    investorId: string;
    role: string;  
    businessId: string;  
};

export default function AskInFormationPopup({ role, link, investorId, businessId }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef<null | HTMLDialogElement>(null);
    const router = useRouter();
    const [reason, setReason] = useState("");  // State to track reason input
    const closeDialog = () => {
        dialogRef.current?.close();
        router.push(link);
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value);  // Update reason state on input change
    };

    const clickOk = async () => {
        if (!reason) {
            toast.error("Please provide a reason.");  // Check if reason is provided
            return;
        }

        const toastId = toast.loading("Sending request...");

        try {
            const res = await fetch("/api/request/createInvestorRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    investor_id: investorId,  
                    business_id: businessId,  
                    status_from_admin: "pending", 
                    status_from_business: "pending",       
                    reason,                   
                }),
            });
            
            if (res.status === 401){
                toast.error("You have to login first")
                window.location.href = "/login"
                throw new Error("Not Authenticated");
            }
            else if (role != "investor"){
                toast.error("Only investor can ask for more information")
                throw new Error("Not investor");
            }
            else if (!res.ok) {
                toast.error("Failed to send request. Please try again.", { id: toastId });
                throw new Error("Failed to send the request");
            }
            toast.success("Send request successful", { id: toastId });
            setTimeout(() => {
                setIsDialogOpen(false);  
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                <Button className="bg-[#D9D9D9] w-[30rem] h-[3rem] rounded-3xl mt-3 hover:text-white " onClick={() => setIsDialogOpen(true)}>
                      Ask for more information
                </Button>
                </DialogTrigger>
                <DialogContent className="flex max-w-[40vw] max-h-[80vh] flex-col bg-white ">
                    <DialogHeader>
                    <DialogTitle>
                    Data Sharing Permission and Access Policy
                    </DialogTitle>
                    <DialogDescription>
                       Ask for more infomation
                    </DialogDescription>
                    </DialogHeader>
                    <p className="overflow-auto">
                    To ensure the responsible and secure handling of sensitive company data, the following terms outline the requirements and permissions for data access:

                      <ul><b>1. Identity Verification</b></ul>
                      Before granting access to the company’s data, we are committed to verifying your identity. This process is essential to ensure that only authorized individuals or entities are permitted access. Verification may require submission of valid identification, contact information, or other relevant documentation.

                      <ul><b>2. Purpose of Access </b></ul>
                      You must clearly state the reason for requesting access to company data. This includes specifying how the data will be used and how it aligns with the company’s interests or operations. The information provided will help us evaluate and process your request effectively.
      
                      <ul><b>3. Collection of Additional Information </b></ul>
                      As part of the approval process, we may need to collect additional information from you. This can include details about your role, relationship with the company, or specific data requirements. The purpose of this collection is to ensure transparency and provide a better understanding of the request context.

                      <ul><b>4. Consent to Access and Use </b></ul>
                      By sharing your profile and related information, you grant explicit consent for the company to access, process, and use your details. This consent is given with the understanding that the information will be used exclusively to enhance the quality of our services, provide support, and address your specific data-related needs.

                      <ul><b>5. Confidentiality and Data Protection </b></ul>
                      The company is committed to maintaining the confidentiality of your personal and professional information. All data shared will be handled in accordance with applicable privacy laws and internal security policies. Information will not be disclosed to third parties without your prior consent, except where legally required.

                      <ul><b>6. Approval Process</b></ul>
                      Each request will be reviewed on a case-by-case basis, taking into account the provided reason, the necessity of access, and the alignment with the company’s policies. Requests that do not provide a clear and legitimate purpose may be denied.

                      By submitting your profile and request for access, you agree to the terms outlined above and acknowledge your understanding of the responsibilities associated with accessing company data. If you have any questions or require further assistance, please contact our support team.
                    </p>
                    <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Reason for Request</label>
                            <input
                                type="text"
                                value={reason}
                                onChange={handleReasonChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your reason..."
                            />
                        </div>
                    <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary" onClick={clickOk}>
                        Allow
                      </Button>
                    
                  </DialogFooter>
                </DialogContent>
                
                </Dialog>
       
        </>
    ) 
}
