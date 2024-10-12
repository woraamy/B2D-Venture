"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import Tag from "../ui/tag";

const BusinessRequestCard = ({className, email, contact, address, name, description, tag}) => {
 return (
    <div className ={className}>
            <Card className= "shadow-md overflow-hidden relative  w-[300px] h-[350px] bg-white rounded-xl">
            
                <div className="relative group">
                    <CardContent className="relative z-0 bg-white h-[400px] .text-[24px]  transition-transform duration-400 transform group-hover:-translate-y-[120px]">
                        <div className="relative z-10 -top-7  ">
                        </div>
                        <div className="relative -top-7">
                            <div className="overflow-hidden relative ml-2 h-[110px]">
                                
                                <h2 className="mt-10 font-semibold">{name}</h2>
                                <p className="text-[15px] font-normal">{description}</p>
                            </div>
                            <div className="ml-2 flex">
                               {Array.isArray(tag) && tag.map((tag, index) => (
                                    <Tag className="pr-2"
                                    key={index}
                                    tagName={tag} 
                                    />
                                ))}
                            </div>
                            <div className="mt-4">
                                <hr className="mb-2  border-t border-gray-300" />
                                <div className="flex">
                                    <p className="ml-2">Email</p>
                                    <p className="ml-2 text-[15px] font-semibold">{email}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2">Tel.</p>
                                    <p className="ml-2 text-[15px] font-semibold">{contact}</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2">Address</p>
                                    <p className="ml-2 text-[15px] font-semibold">{address}</p>
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