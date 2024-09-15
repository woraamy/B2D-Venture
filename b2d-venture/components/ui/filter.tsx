"use client";

import { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Input } from './input';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { Badge } from './badge';
import SearchBar from './searchbar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from './dropdown-menu';
// import {useCheckbox, Chip, VisuallyHidden, tv} from "@nextui-org/react";


export default function Filter({className}){
    const tag = ["Aerospace", "Food & Drinks", "Shop", "Technology", "Innovation", "Transportation", "Energy", "AI & Machine Learning"]
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
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
                <div className="absolute w-[20%] h-[350px] bg-white shadow-lg rounded-lg z-10 overflow-auto">
                    <div className="flex sort ml-2 mt-2 mr-2">
                        <SearchBar text="Search Tag"/>
                        <div className='ml-2'>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='text-white'>
                                    <span className='ml-2'>Sorted</span>
                                    <div className='ml-2'>
                                        <FaAngleDown />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Newest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Popular
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="h-[250px] overflow-auto flex flex-wrap gap-4">
                        {tag.map((item, index) => (
                            <div key={index} className="flex  items-center mt-2 ml-2">
                             <Checkbox
                                className="inline-box"
                                label={item}
                                value={checked}
                                onChange={handleChange}
                                />
                                 <span className="ml-2">{item}</span>
                            </div>
                        ))}
                    </div>
                    <Button className='mt-1 ml-2 text-white '>
                        Filter Now
                    </Button>
                </div>
            )}
        </div>
  
    );
};

           
// export default Filter;