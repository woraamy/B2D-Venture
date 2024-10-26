"use client"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation'
export default function TableCard({className, data, valueClassname, onDelete}){
    if(!Array.isArray(data)){
        return (<div>Invalid value</div>)
    }

    return (      
        <div className={className}>
            <div className="flex justify-between bg-white w-[75vw] h-[50px] border-2 rounded-xl">
                {data.map((value, index) => (
                    <div key={index} className={`flex items-center justify-center px-7 ${valueClassname}`} style={{ flex: '1' }}>
                        {value.type === "text" ? (
                            <h1 className="mt-0">{value.value}</h1> 
                        ) : value.type === "image" ? (
                            <div className="relative flex items-center">
                                <Image 
                                    src={value.value.src || '/assets/images/profile-user.png'} 
                                    style={{ objectFit: "cover" }}
                                    alt="Business Image" 
                                    width={40} 
                                    height={40}
                                    className="rounded-full"
                                />
                                <h1 className="ml-2 whitespace-nowrap">{value.value.text}</h1> 
                            </div>
                        ) : value.type === "button" ? (
                            value.value.isHave ? (
                                (value.value.action === "delete" ? (
                                    <Button onClick={() =>onDelete()}>
                                        {value.value.text}
                                    </Button>
                                ): (
                                    <Button >{value.value.text}</Button>
                                )
                                )
                        
                            ) : null
                          ) : null}               
                    </div>
                ))}
            </div>
        </div>
    )
}