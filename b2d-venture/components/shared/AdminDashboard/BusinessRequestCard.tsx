"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import Tag from "../../ui/tag";
import connectDB from "@/lib/connectDB";
import { Button } from "../../ui/button";
import BusinessRequest from "@/models/businessRequest";
import toast from "react-hot-toast";

const BusinessRequestCard = ({className, id, email, contact, address, name, description, tag, status}) => {
    async function handleAllow(id: string, type: 'business' | 'investor') {
        try {
            const response = await fetch('/api/request/businessRequestAction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, action: 'allow' }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve request');
            }

            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleReject(id: string, type: 'business' | 'investor') {
        try {
            const response = await fetch('/api/request/businessRequestAction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, action: 'reject' }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject request');
            }

            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

 return (
    <div className ={className}>
            <Card className= "shadow-md overflow-hidden relative  w-[300px] h-[360px] bg-white rounded-xl">
            
                <div className="relative group">
                    <CardContent className="relative z-0 bg-[#FFF8F2] h-[400px] .text-[24px] ">
                        <div className="relative -top-7">
                            <div className="overflow-hidden relative ml-2 h-[110px]">
                                <h2 className="mt-10 font-semibold">{name}</h2>
                                <p className="text-[15px] font-normal">{description}</p>
                            </div>
                            
                            <div className="ml-2 mt-2 flex">
                               {Array.isArray(tag) && tag.map((tag, index) => (
                                    <Tag className="pr-2"
                                    key={index}
                                    tagName={tag} 
                                    />
                                ))}
                            </div>
                            <div className="relative block flex-col mt-4 overflow-hidden">
                                <hr className="mb-2  border-t border-gray-300" />
                                <div className="flex">
                                    <p className="ml-2">Email</p>
                                    <p className="ml-2 text-[15px] font-semibold">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2">Tel.</p>
                                    <p className="ml-2 text-[15px] font-semibold">{contact}</p>
                                </div>
                                <div className="mr-2 flex relative">
                                    <p className="ml-2">Address</p>
                                    <p className="ml-2 block text-[15px] font-semibold">{address}</p>
                                </div>
                                {status === "pending" ? (
                                    <div className="flex justify-start mt-2">
                                    <Button onClick={() => handleAllow(id, 'business')} className="rounded-3xl bg-green-600 hover:bg-blue-950">Allow</Button>
                                    <Button onClick={() => handleAllow(id, 'business')} className="rounded-3xl ml-3 bg-red-600 hover:bg-blue-950">Reject</Button>
                                    </div>
                                ) : status === "approved"|| "done" ? (
                                    <p className="mt-2 text-green-600">Request approved</p>
                                ) : (
                                    <p className="mt-2 text-red-600">Request rejected</p>
                                 )}

                            </div>
                            
                        </div>
                    </CardContent>
                
                </div>
            </Card>
    </div>
 );
};

export default BusinessRequestCard;