"use client"
import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

export default function SearchBar({text, data, onSearch, obj}){
      const [query, setQuery] = useState('');
      const [isFound, setIsFound] = useState(true);
      async function handleSearch() {
            try {
                  setIsFound(true);
                  const response = await fetch('/api/search', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              data: data,  
                              value: query,
                              obj: obj
                          }) 
                    });
                  if (!response.ok) {
                        throw new Error('Search request failed');
                  }
                  const datas = await response.json();
                  if (!datas || datas.length === 0){
                        setIsFound(false);
                  }
                  onSearch(datas) //retreive data at the parent page
            } catch(error){
                  console.log(error)
            }
      }
      const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
              handleSearch(); // Trigger search on Enter key
            }
          };
      return (
            <div className='w-full'>
                  <input
                  type="text"
                  value={query}
                  placeholder={text}
                  className="h-42px border p-2 w-full rounded-md bg-[#F2EBEB]"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  />
                  {!isFound ?(
                        <div className='relative ml-[0%]'>
                              <p className='text-red-500 text-2xl mt-5 '>no match is found</p>
                        </div>
                  ) : null
                  }
                  
            </div>
      );
};    

