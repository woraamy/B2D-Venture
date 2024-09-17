import { promises as fs } from "fs";
import Image from "next/image";
import Tag from "@/components/ui/tag";
import DetailCard from "@/components/shared/DetailCard";
import { Button } from "@/components/ui/button";
async function fetchbusinessData(id){
    const filePath = process.cwd() + '/public/data/business.json';
    const file = await fs.readFile(filePath);
    const data = JSON.parse(file);
    return data.find((entry) => entry.id === parseInt(id, 10));
}
export default async function Page({params}) {
    const {id} = params;
    const business = await fetchbusinessData(id);
    if (!business) {
        return <div>business not found</div>;
    }

    return(
        <div  className="">
            <div className="flex flex-col gap-1 mt-[3%] ml-[15%] max-w-[50%]">
                <div className="flex">
                    <div className="relative h-[100px] w-[100px]">
                        <Image 
                        src={business.profile}
                        alt="profile"
                        fill={true}
                        style={{objectFit:"cover"}}
                        className="rounded-md "
                        />
                    </div>
                    <div className="ml-5">
                        <h1 className="text-[#18063C] text-[48px] font-semibold">{business.business_name} </h1>
                        <p className="text-[16px]">by {business.company}</p>
                    </div>
                </div>
                <p className="mt-5">{business.description}</p>
                <div className="flex mt-2">
                    {business.tag.map((item, key)=>(
                        <Tag 
                        key={key}
                        tagName={item}
                        className='mr-2' 
                        />
                    ))}
                </div>
                <div className="relative mt-5 h-[30rem] w-[45vw]">
                    <Image 
                    src={business.coverimg}
                    alt="s"
                    fill={true}
                    style={{objectFit:"cover"}}
                    />
                </div>
            </div>
            <div className="fixed flex flex-col top-[15%] left-[65%]"> 
                <DetailCard Data={business}/>
                <Button className="text-white w-[30rem] h-[3rem] rounded-3xl mt-7"> Invest </Button>
                <Button className="bg-[#D9D9D9] w-[30rem] h-[3rem] rounded-3xl mt-3 hover:text-white"> Ask for more information </Button>
            </div>
        </div>

    )
}