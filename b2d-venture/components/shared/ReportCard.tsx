"use client"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function ReportCard({className, name, amount}){
    return (
        <div className="py-5 px-2">
            <Card className= "shadow-md overflow-hidden relative  w-[14vw] h-[120px] bg-white rounded-xl">
                <h1 className='text-lg py-3 px-5 font-bold'>{name}</h1>
                <span className="absolute text-3xl p-5 text-[#FF553E] left-0 bottom-0 ">{amount.toLocaleString()}</span>
            </Card>

        </div>
    )
}