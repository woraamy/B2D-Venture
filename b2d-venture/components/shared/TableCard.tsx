"use client"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function TableCard({className, data, valueClassname}){
    if(!Array.isArray(data)){
        return (<div>Invalid value</div>)
    }
    return (      
        <div className={className}>
            <div className="flex justify-between bg-white w-[75vw] h-[40px] border-2 rounded-xl">
                {data.map((value)=>(
                    <div className={`mt-2 px-5 ${valueClassname}`}>
                        {value}
                    </div>
                ))
                }
            </div>
        </div>
    )
}