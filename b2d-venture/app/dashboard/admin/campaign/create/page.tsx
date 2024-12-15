
"use client"
import { CreateRaiseCampaignForm } from "@/components/shared/BusinessDashboard/CreateRaiseCampaign";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { FaAngleDown } from "react-icons/fa";

export default function Page() {
    const [data, setData] = useState([])
    const [select, setSelect] = useState("choose business")
    const [id, setId] = useState("")
    async function fetchData(){
      const response = await fetch('/api/fetchingData/Business')
      const res = await response.json()
      setData(res.data || [])
    }

    useEffect(()  => {
      void fetchData()
    }, [])

    function handleSelect(name, ids){
        setSelect(`${name} : ${ids}`)
        setId(ids)
    }

    return(
      <div>
        <div className="">
                    <div className="flex sort ml-10 mt-10 mr-2">
                        <div className='flex ml-2 items-center'>
                            Select Business :
                            <div className='ml-2'>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='bg-white border-2'>
                                        <span className='ml-2 text-black font-normal'>{select}</span>
                                        <div className='ml-2 text-black'>
                                            <FaAngleDown />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {data.map((item, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                onClick={() => handleSelect(item.BusinessName,item._id)} // Use the actual item value
                                            >
                                                {item._id} : {item.BusinessName}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                        </div>
                    </div>
          </div>
          {id ? (
                <CreateRaiseCampaignForm params={id} />
          ) : null}

      </div>

      );

};