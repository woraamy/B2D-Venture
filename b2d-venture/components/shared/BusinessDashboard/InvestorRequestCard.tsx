"use client";

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import connectDB from "@/lib/connectDB";
import { Key } from "lucide-react";
import InvestorRequest from "@/models/InvestorRequest";
import { toast } from "react-toastify";

const InvestorRequestCard = ({ className, id, email, contact, name, description, business, reason, status_from_business, time, profile}) => {
    async function handleAllow(id: string, type: 'business' | 'admin') {
        try {
            const response = await fetch('/api/request/investorRequestAction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, action: 'allow' }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve request');
            }

            const responseEmail = await fetch(`/api/emailSending/${id}/dataroomAccess/investor?email=${email}`,{method: 'POST'})
            if (!responseEmail.ok) {
                throw new Error('Failed to send notification');
            }

            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleReject(id: string, type: 'business' | 'admin') {
        try {
            const response = await fetch('/api/request/investorRequestAction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, action: 'reject' }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject request');
            }
            const responseEmail = await fetch(`/api/emailSending/${id}/dataroomAccess/investor?email=${email}`,{method: 'POST'})
            if (!responseEmail.ok) {
                throw new Error('Failed to send notification');
            }
            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className={className}>
            <Card className="shadow-md overflow-hidden relative w-[350px] h-[270px] bg-white rounded-xl  transition-all duration-300 transform group hover:h-[425px]">
                <CardHeader className='flex bg-[#FF553E] w-full text-white h-[7%] inline-block'>
                    <p className="-mt-3">Request to : <b>{business}</b> </p>
                    
                </CardHeader>
                <div className="relative group">
                    <CardContent className="relative z-0  h-[210px]">
                        <div className="relative ">
                            <div className=" relative ml-2 h-[150px]">
                                <div className="flex mt-2 ">
                                        <img
                                            src={profile || "/assets/images/profile-user.png"}
                                            alt="Profile preview"
                                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                                        />
                                        
                                    <h2 className="mt-2 ml-2 font-semibold">{name}</h2>
                                </div>
                                <div className="overflow-auto h-[75%] text-[15px] mt-1 font-normal">{description}</div>
                                
                            </div>
                            {status_from_business === "pending" ? (
                                    <div className="flex justify-start mt-2">
                                        <Button onClick={() => handleAllow(id, 'business')} className="rounded-3xl bg-green-600 hover:bg-blue-950">Allow</Button>
                                        <Button onClick={() => handleReject(id, 'business')} className="rounded-3xl ml-3 bg-red-600 hover:bg-blue-950">Reject</Button>
                                    </div>
                                ) : status_from_business === "approved" || status_from_business === "done" ? (
                                    <div className="flex items-center justify-center text-sm mt-5 text-green-600 bg-green-200 rounded-full w-[40%]"> <p>Approved</p></div>
                                ) : status_from_business === "declined" ? (
                                    <div className="flex items-center justify-center text-sm mt-5 text-red-600 bg-red-200 rounded-full w-[40%]"> Rejected</div>
                                ) : null}

                            <div className="hidden group-hover:block transition-all duration-300">
                                <hr className="mb-2 mt-2 border-t border-gray-300" />
                                <div className="overflow-auto relative ml-2 h-[80px]">
                                    <h2 className="font-semibold">Reason</h2>
                                    <p className="text-[15px] font-normal text-gray-700">{reason}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 font-semibold">Email</p>
                                    <p className="ml-2 text-[15px] text-gray-700 max-w-[200px]">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 font-semibold">Tel.</p>
                                    <p className="ml-2 text-[15px] text-gray-700">{contact}</p>
                                </div>
                                <div> 
                                    <p className="ml-2 text-slate-500">Request at: {time}</p>
                                </div>

                            </div>

                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default InvestorRequestCard;