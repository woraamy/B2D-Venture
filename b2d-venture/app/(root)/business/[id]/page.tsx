import { promises as fs } from "fs";
import Image from "next/image";


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
        <div >
            <div className="flex flex-wrap mt-20 ml-[10%] max-w-[50%]">
                <div className="flex">
                    <div className="relative h-[60px] w-[60px]">
                        <Image 
                        src={business.profile}
                        alt="profile"
                        fill={true}
                        style={{objectFit:"cover"}}
                        className="rounded-md "
                        />
                    </div>
                    {business.name} 
                </div>
            </div>
        </div>
    )
}