"use client";

import { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import SearchBar from '../ui/searchbar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from '../ui/dropdown-menu';


export default function Filter({className, onSubmit, data, obj, tag, select, timeKey}){
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    
    const handleCheck = (event) => {
        const value = event.target.value; 
        setChecked((prevChecked) => {
            if (event.target.checked) {
                return [...prevChecked, value]; 
            } else {
                return prevChecked.filter((tag) => tag !== value);
            }
        });
    };
    const [selectedSort, setSelectedSort] = useState("Select sort value");
    
    function handleSortSelect(sortOption){
        setSelectedSort(sortOption);
    };

    async function handleSubmit(){
        try{
            console.log("Selected Tags:", checked);
            const response = await fetch('/api/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  data: data,  
                  tag: checked,
                  sort: selectedSort,
                  obj: obj,
                  timeKey: timeKey
              }) 
        });
        const datas = await response.json();
        onSubmit(datas)
        }catch(error){
            console.log(error)
        };
    }

    return (
        <div className={className}>
            <Button 
                className='text-white'
                onClick={() => setIsOpen(!isOpen)}
                >
                    <IoFilter />
                    <span className='ml-2'>Filter</span>
                    <div className='ml-2'>
                        <FaAngleDown />
                    </div>
            </Button>
            {isOpen &&(
                <div className="absolute w-[25%] h-auto bg-white shadow-lg rounded-lg z-10 overflow-auto">
                    <div className="flex sort ml-2 mt-2 mr-2">
                        <div className='flex ml-2 items-center'>
                            Sorted by :
                            <div className='ml-2'>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='bg-white border-2'>
                                        <span className='ml-2 text-black font-normal'>{selectedSort}</span>
                                        <div className='ml-2 text-black'>
                                            <FaAngleDown />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {select.map((item, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                onClick={() => handleSortSelect(item)} // Use the actual item value
                                            >
                                                {item}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                        </div>
                    </div>
                    <div className="h-auto overflow-auto flex flex-wrap gap-4">
                        {tag.map((item, index) => (
                            <div key={index} className="flex items-center justify-normal mt-2 ml-2">
                            <input
                                type="checkbox"
                                value={item}
                                onChange={handleCheck}
                                />
                                 <span className="ml-2">{item}</span>
                            </div>
                        ))}
                    </div>
                    <Button className='mt-1 ml-2 mb-2 text-white' onClick={handleSubmit}>
                        Filter Now
                    </Button>
                </div>
            )}
        </div>
  
    );
};

