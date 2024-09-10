import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";
const BusinessCard = ({className, coverimg, profile, name, description, raised, investors, min, valuation}) => {
 return (
    <div className ={className}>
        <Card className= "overflow-hidden relative  w-[300px] h-[350px] bg-[#F2EBEB] rounded-xl">
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
            <div className="absolute left-[10%] top-[40%]">
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
            <div className="relative group ">
                <CardContent className="relative bg-[#F2EBEB] h-[400px] .text-[24px]  hover:relative transition-all duration-400 hover:bottom-[120px] hover:border-2">
                    <h2 className="mt-7 ml-2 font-semibold">{name}</h2>
                    <p className="ml-2 text-[15px] font-normal">{description}</p>
                    <hr className="mb-2 mt-[100px] border-t border-gray-300" />
                    <p className="ml-2 text-[15px] font-normal">{description}</p>
                 </CardContent>
              
            </div>
        </Card>

    </div>
 );
};

export default BusinessCard;