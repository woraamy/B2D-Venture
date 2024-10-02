import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

const SearchBar = ({text}) => {
   return (
         <input
         type="text"
         placeholder={text}
         className="h-42px border p-2 w-full rounded-md bg-[#F2EBEB]"
         />
   );
};

export default SearchBar;