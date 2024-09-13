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
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
  } from './dropdown-menu';

export default function Filter({className}){
    const tag = ["Aerospace", "Food & Drinks", "Shop", "Technology", "Innovation", "Transportation", "Energy", "AI & Machine Learning"]
    const [isOpen, setIsOpen] = useState(false);
    // const [checkedItems, setCheckedItems] = useState([]);

    // const handleCheckBoxChange = (item) => {
    //     setCheckedItems((prev) => 
    //         prev.includes(item)
    //         ? prev.filter((i) => i !== item)
    //         : [...prev, item] 
    //     );
    // };
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
                <div className="absolute w-[300px] h-[300px] bg-white shadow-lg rounded-lg z-10">
                    <div className="flex sort ml-2 mt-2 mr-2">
                        <SearchBar/>
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
                                    <DropdownMenuItem>
                                        sd
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            )}
        </div>
  
    );
};

           
// export default Filter;