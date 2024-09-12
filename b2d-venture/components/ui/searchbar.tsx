import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

const SearchBar = ({className}) => {
   return (
      <div className={`flex ${className}`}>
         <input
         type="text"
         placeholder=" Search businesses "
         className="h-42px border p-2 w-full rounded-md bg-[#F2EBEB]"
         />
         <Button className='text-white ms-5'>
            <IoFilter />            
            Filter
         </Button>
      </div>
 
   );
};

export default SearchBar;