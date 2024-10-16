"use client"
import { Card, CardContent, CardHeader } from "../ui/card"
export default function DetailCard({Data}){
    console.log(Data);
    if (!Data || Data.data.goal === 0) return null; 
    const percent = parseInt(Data.data.raised)/parseInt(Data.data.goal)*100;
    const formattedPercent = percent.toFixed(2);
    const mformatt = (parseInt(Data.data.goal)/1000000).toFixed(2);
    return(
        <Card className="bg-white h-[30rem] w-[30rem] shadow-lg ">
            <CardHeader className="border-b-4 border-[#D9D9D9]">
                <h1 className="text-[20px]">Rasied</h1>
                <h1 className="text-[32px]"><b>${Data.data.raised}</b> | {formattedPercent}%</h1>
                <div className="w-full h-4 mb-4 bg-white rounded-full">
                    <div
                        className="h-4 bg-[#45B52A] rounded-full"
                        style={{ width: `${formattedPercent}%` }}
                    ></div>                
                </div>
                <div className="flex text-[24px]">
                    <h2 className="mt-3">Funding goal</h2>
                    <b><h2 className="ml-20 mt-2 text-[30px]">{mformatt} M</h2></b>
                </div>
            </CardHeader> 
            <CardContent>
                <table className="text-[16px] mt-5">
                    <tr>
                        <td className="w-[60%] py-2">Valuation cap</td>
                        <td className="font-semibold px-5">${Data.data.business_id.valuation}</td>
                    </tr>
                    <tr>
                        <td>Minimum investment</td>
                        <td className="font-semibold py-2 px-5">${Data.data.min_investment}</td>
                    </tr>
                    <tr>
                        <td>Maximum investment</td>
                        <td className="font-semibold py-2 px-5">${Data.data.max_investment}</td>
                    </tr>
                    <tr>
                        <td>Investors</td>
                        <td className="font-semibold py-2 px-5">"10"</td>
                    </tr>
                    <tr>
                        <td>Deadline</td>
                        <td className="font-semibold py-2 px-5">{Data.data.end_date}</td>
                    </tr>
                    
                </table>
            </CardContent>
        </Card>
    )
}