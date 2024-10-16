"use client"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../../ui/button"
export default function TableCard({className, data, valueClassname}){
    if(!Array.isArray(data)){
        return (<div>Invalid value</div>)
    }
    return (      
        <div className={className}>
            <div className="flex justify-between bg-white w-[75vw] h-[50px] border-2 rounded-xl">
                {data.map((value, index)=>(
                    <div key={index} className={`mt-3 px-7 ${valueClassname}`}>
                        {value.type === "text" ?(
                            <h1>{value.value}</h1>
                        ) : value.type === "image" ?  (
                            <div className="relative w-[50px] h-[50px] ">
                                    {/* <Image 
                                    src={value.value.src} 
                                    style={{objectFit:"cover"}}
                                    alt="Business Image" 
                                    fill={true}
                                    className="rounded-full"
                                    /> */}
                                    <h1>{value.value.text}</h1>
                            </div>
                        ) :value.type === "button" ? (
                                    <Button>{value.value}</Button>
                        ) : null}                        
                    </div>
                ))
                }
            </div>
        </div>
    )
}