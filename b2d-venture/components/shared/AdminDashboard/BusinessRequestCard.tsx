"use client";
import { Card, CardContent } from "@/components/ui/card"
import Tag from "../../ui/tag";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";

const BusinessRequestCard = ({className, id, email, contact, address, name, description, tag, status, time}) => {
    async function handleAllow(id: string, type: 'business' | 'investor') {
        // const businessRequest = await BusinessRequest.findById(id); // find business request by id

        try {
            const response = await fetch('/api/register/business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, email, action: 'allow' }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve request');
            }
            const responseEmail = await fetch(`/api/emailSending/${id}/businessCreate`,{method: 'POST'})
            if (!responseEmail.ok) {
                throw new Error('Failed to send notification');
            }
            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleReject(id: string, type: 'business' | 'investor') {
        try {
            const response = await fetch('/api/register/business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, action: 'reject' }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject request');
            }
            const responseEmail = await fetch(`/api/emailSending/${id}/businessCreate`,{method: 'POST'})
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
    <div className ={className}>
            <Card className= "shadow-md overflow-hidden relative w-[350px] h-[270px] bg-white rounded-xl  transition-all duration-300 transform group hover:h-[400px]">
            
                <div className="relative group">
                    <CardContent className="relative z-0 h-[210px] .text-[24px] ">
                        <div className="relative -top-7">
                            <div className="overflow-hidden relative ml-2 h-[180px]">
                                <h2 className="mt-10 font-semibold">{name}</h2>
                                <p className="overflow-auto h-[75%] text-[15px] mt-1 font-normal">{description}</p>
                            </div>
                            
                            <div className="ml-2 mt-2 flex overflow-auto ">
                               {Array.isArray(tag) && tag.map((tag, index) => (
                                    <Tag className="pr-2"
                                    key={index}
                                    tagName={tag} 
                                    />
                                ))}
                            </div>
                            {status === "pending" ? (
                                    <div className="flex justify-start mt-2">
                                    <Button onClick={() => handleAllow(id, 'business')} className="rounded-3xl bg-green-600 hover:bg-blue-950">Allow</Button>
                                    <Button onClick={() => handleReject(id, 'business')} className="rounded-3xl ml-3 bg-red-600 hover:bg-blue-950">Reject</Button>
                                    </div>
                                ) : status === "approved"|| status === "done" ? (
                                    <p className="flex items-center justify-center text-sm mt-5 text-green-600 bg-green-200 rounded-full w-[40%]">Approved</p>
                                ) : (
                                    <p className="flex items-center justify-center text-sm mt-5 text-red-600 bg-red-200 rounded-full w-[40%]">Rejected</p>
                                 )}

                            <div className="hidden group-hover:block transition-all duration-300">
                                <hr className="mb-2 mt-2 border-t border-gray-300" />
                                <div className="flex font-semibold">
                                    <p className="ml-2">Email</p>
                                    <p className="ml-2 text-[15px] font-normal text-gray-700">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 font-semibold">Tel.</p>
                                    <p className="ml-2 text-[15px] font-normal text-gray-700">{contact}</p>
                                </div>
                                <div className="mr-2 flex relative">
                                    <p className="ml-2 font-semibold">Address</p>
                                    <p className="ml-2 block text-[15px] font-normal text-gray-700">{address}</p>
                                </div>
                                <div> 
                                    <p className="ml-2 text-slate-500">request at: {time}</p>
                                </div>
                                
                            </div>
                            
                        </div>
                    </CardContent>
                
                </div>
            </Card>
    </div>
 );
};

export default BusinessRequestCard;