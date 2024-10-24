"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
    title: string;
    link: string;
    children: React.ReactNode;
    oktext: string;
    successmessage: string;
    investorId: string;  // Added investorId prop
    businessId: string;  // Added businessId prop
};

export default function Dialog({ title, children, link, oktext, successmessage, investorId, businessId }: Props) {
    const searchParams = useSearchParams();
    const dialogRef = useRef<null | HTMLDialogElement>(null);
    const showDialog = searchParams.get("showDialog");
    const router = useRouter();
    const [reason, setReason] = useState("");  // State to track reason input

    useEffect(() => {
        if (showDialog === "y") {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showDialog]);

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
            console.log("yee") ;
            console.log(res);

            if (!res.ok) {
                throw new Error("Failed to send the request");
            }

            toast.success(successmessage, { id: toastId });
            setTimeout(() => {
                closeDialog();  
            }, 2000);

        } catch (error) {
            console.log(error);
            toast.error("Failed to send request. Please try again.", { id: toastId });
        }
    };

    const dialog: JSX.Element | null = showDialog === "y" ? (
        <>
            <dialog ref={dialogRef} className="fixed top-20 left-[40%] -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50">
                <Toaster />
                <div className="w-[500px] max-w-full bg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-[#FF553E]">
                        <h1 className="text-2xl text-white">{title}</h1>
                        <button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >
                            x
                        </button>
                    </div>
                    <div className="px-5 pb-6">
                        {children}
                        {/* Reason Input Field */}
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
                        {/* End Reason Input Field */}

                        <div className="flex flex-row justify-end mt-4">
                            <button onClick={clickOk} className="bg-[#FF553E] py-1 px-2 rounded border-none text-white">
                                {oktext}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    ) : null;

    return dialog;
}
