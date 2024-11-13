"use client"
import { useEffect, useState } from "react";
import Image from "next/image";


export default function ImageContainer({id}) {
    const [data, setData] = useState([])
    async function fetchData(){
        const response = await fetch(`/api/fetchingData/getFilebyBuisnessId?businessId=${id}`);
        const data = await response.json();
        setData(data.data || []);
    }
    useEffect(()  => {
        fetchData()
      }, [])
    
      if (data.length === 0) {
        return <div>No user data</div>;
    }

    return (
        <div>
            <div className="flex">
                
                <div className="relative h-[20%] w-auto">
                        <Image
                            src={data[0].filePath}
                            alt="Cover Image"
                            fill={true}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
            </div>
        </div>

    );
}