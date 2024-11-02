"use client";

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import connectDB from "@/lib/connectDB";
import { Key } from "lucide-react";
import InvestorRequest from "@/models/InvestorRequest";
import { toast } from "react-toastify";

const InvestorRequestCard = ({ className, id, email, contact, name, description, business, link, reason, status_from_business }) => {
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

            const responseEmail = await fetch(`/api/emailSending/${id}/dataroomAccess?email=${email}`,{method: 'POST'})
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
            const responseEmail = await fetch(`/api/emailSending/${id}/dataroomAccess?email=${email}`,{method: 'POST'})
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
            <Card className="shadow-md overflow-hidden relative w-[300px] h-[360px] bg-white rounded-xl">
                <CardHeader className='flex bg-[#FF553E] w-full text-white h-[7%] inline-block'>
                    <b>Request to:</b>
                    <Link href={`/business/${link}`} className="ml-2 underline hover:text-blue-700">{business}</Link>
                </CardHeader>
                <div className="relative group">
                    <CardContent className="relative z-0 bg-[#FFF8F2] h-[400px]">
                        <div className="relative">
                            <div className="overflow-auto relative ml-2 h-[100px]">
                                <h2 className="mt-2 font-semibold">{name}</h2>
                                <p className="text-[15px] font-normal">{description}</p>
                            </div>
                            <div className="overflow-auto relative ml-2 h-[80px]">
                                <h2 className="mt-2 font-semibold">Reason</h2>
                                <p className="text-[15px] font-normal">{reason}</p>
                            </div>

                            <div className="relative block flex-col mt-4 overflow-hidden">
                                <hr className="mb-2 border-t border-gray-300" />
                                <div className="flex">
                                    <p className="ml-2">Email</p>
                                    <p className="ml-2 text-[15px] font-semibold">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2">Tel.</p>
                                    <p className="ml-2 text-[15px] font-semibold">{contact}</p>
                                </div>

                                {status_from_business === "pending" ? (
                                    <div className="flex justify-start mt-2">
                                        <Button onClick={() => handleAllow(id, 'business')} className="rounded-3xl bg-green-600 hover:bg-blue-950">Allow</Button>
                                        <Button onClick={() => handleReject(id, 'business')} className="rounded-3xl ml-3 bg-red-600 hover:bg-blue-950">Reject</Button>
                                    </div>
                                ) : status_from_business === "approved" ? (
                                    <p className="mt-2 text-green-600">Request approved</p>
                                ) : status_from_business === "declined" ? (
                                    <p className="mt-2 text-red-600">Request rejected</p>
                                ) : null}
                            </div>

                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default InvestorRequestCard;