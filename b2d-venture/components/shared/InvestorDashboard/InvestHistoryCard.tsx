"use client";
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
const InvestHistoryCard = ({className, businessName, businessImg, link, valuation, raised, equityStake, date}) => {
    return (
    <div className ={className}>
            <Card className= "shadow-md overflow-hidden relative bg-white w-[420px] h-[110px] bg-white rounded-xl">
            
                <div className="relative group">
                    <CardContent className="flex relative z-0">
                        <div className="relative w-[50px] h-[50px] mt-5 ">
                                    <Image 
                                    src={businessImg} 
                                    style={{objectFit:"cover"}}
                                    alt="Business Image" 
                                    fill={true}
                                    className="rounded-full"
                                    />
                        </div>
                        <div className="mt-3 ml-5">
                            <div className="flex">
                                <Link href={`/business/${link}`} className="text-[#144583] font-semibold text-s underline">{businessName}</Link>
                                <span className="ml-auto">{date}</span>
                            </div>
                            <table className="text-xs">
                            <tbody>
                                <tr>
                                <td>Valuation</td>
                                <td>
                                    <div className="ml-20">$ {valuation}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>Raised</td>
                                <td>
                                    <div className="ml-20">$ {raised}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>Equity Stake</td>
                                <td>
                                    <div className="ml-20">{equityStake} %</div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </CardContent>
                
                </div>
            </Card>
    </div>
 );
};

export default InvestHistoryCard;