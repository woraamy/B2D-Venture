"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const RequestStatus = ({className, businessName, status, date, link, businessImg}) => {
    return (
    <div className ={className}>
        <div className="flex mt-5 ">
            <div className="relative w-[50px] h-[50px] ">
                                    <Image 
                                    src={businessImg} 
                                    style={{objectFit:"cover"}}
                                    alt="Business Image" 
                                    fill={true}
                                    className="rounded-full"
                                    />
            </div>
            <Link href={`/business/${link}`} className="pl-10 mt-3 text-[#144583] font-semibold text-s underline">{businessName}</Link>
            <h1 className="pl-10 mt-3">{date}</h1>
            { status === 'approve' ? (
                <div className=" flex">
                    <h1 className="pl-10 mt-3 text-green-500 font-semibold">{status}</h1>
                    <Button className="ml-10 shadow-md">View</Button>
                </div>
            ): status === 'pending' ? (
                <h1 className="pl-10 mt-3 text-gray-500 font-semibold">{status}</h1>
            ):(
                <h1 className="pl-10 mt-3 text-red-500 font-semibold">{status}</h1>
            )

            }
        </div>
        <hr className="mb-2 px-2 border-t-2 border-gray-300 w-[90%]" />

    </div>
 );
};

export default RequestStatus;