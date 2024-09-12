import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import Tag from "../ui/tag";
const BusinessCard = ({className, coverimg, profile, name, description, raised, investors, min, valuation, link, tagName, tagLink}) => {
 return (
    <div className ={className}>
         <Link href={link} passHref>
            <Card className= "shadow-md overflow-hidden relative  w-[300px] h-[350px] bg-[#F2EBEB] rounded-xl">
                <CardHeader className="relative flex-grow h-1/2 p-0 m-0">
                    <div className="relative w-full h-full">
                        <Image 
                        src={coverimg} 
                        style={{objectFit:"cover"}}
                        alt="Business Image" 
                        fill={true}
                        className="rounded-t-xl"
                        />
                    </div>
                </CardHeader>
                
            
                <div className="relative group">
                    <CardContent className="relative z-0 bg-[#F2EBEB] h-[400px] .text-[24px]  transition-transform duration-400 transform group-hover:-translate-y-[120px]">
                        <div className="relative z-10 -top-7  ">
                            <div className="relative w-[60px] h-[60px] ">
                                <Image 
                                src={profile} 
                                style={{objectFit:"cover"}}
                                alt="Business Image" 
                                fill={true}
                                className="rounded-t-xl"
                                />
                            </div>
                        </div>
                        <div className="relative -top-7">
                            <div className="overflow relative ml-2 h-[100px]">
                                <h2 className="font-semibold">{name}</h2>
                                <p className="text-[15px] font-normal">{description}</p>
                            </div>
                            <div className="ml-2">
                                <Tag 
                                tagLink={tagLink}
                                tagName={tagName} 
                                />
                            </div>
                            <div className="mt-5">
                                <hr className="mb-2  border-t border-gray-300" />
                                <div className="flex">
                                    <p className="ml-2 text-[15px] font-semibold">{raised}</p>
                                    <p className="ml-2">Raised</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 text-[15px] font-semibold">{investors}</p>
                                    <p className="ml-2">investors</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 text-[15px] font-semibold">{min}</p>
                                    <p className="ml-2">min. investment</p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 text-[15px] font-semibold">{valuation}</p>
                                    <p className="ml-2">valuation cap</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                
                </div>
            </Card>
        </Link>

    </div>
 );
};

export default BusinessCard;