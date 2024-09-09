import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

const SearchBar = () => {
   return (
      <div className='flex mt-10'>
         <input
         type="text"
         placeholder=" Search..."
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