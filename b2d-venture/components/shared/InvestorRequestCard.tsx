"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import Tag from "../ui/tag";
import { Button } from "../ui/button";
const InvestorRequestCard = ({className, email, contact, name, description,business,link, reason}) => {
 return (
    <div className ={className}>
            <Card className= "shadow-md overflow-hidden relative  w-[300px] h-[360px] bg-white rounded-xl ">
                <CardHeader className='flex bg-[#FF553E] w-full text-white h-[7%] inline-block'>
                    <b>Request to:</b> 
                    <Link href={`/business/${link}`} className="ml-2 underline hover:text-blue-700">{business}</Link>
                </CardHeader>
                <div className="relative group">
                    <CardContent className="relative z-0 bg-[#FFF8F2] h-[400px] ">
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
                                <hr className="mb-2  border-t border-gray-300" />
                                <div className="flex">
                                    <p className="ml-2">Email</p>
                                    <p className="ml-2 text-[15px] font-semibold">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2">Tel.</p>
                                    <p className="ml-2 text-[15px] font-semibold">{contact}</p>
                                </div>
                                <div className="">
                                    <Button className="rounded-3xl bg-green-600 hover:bg-blue-950">
                                        Allow
                                    </Button>
                                    <Button className="rounded-3xl ml-3 bg-red-600  hover:bg-blue-950">
                                        Reject
                                    </Button>
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