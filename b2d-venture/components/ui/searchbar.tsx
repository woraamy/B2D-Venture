"use client"
import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

export default function SearchBar({text, data, onSearch, obj}){
      const [query, setQuery] = useState('');
      async function handleSearch() {
            try {
                  console.log(data)
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
                  console.log(datas)
                  onSearch(datas) //retreive data at the parent page
            } catch(error){
                  console.log(error)
            }
      }
      const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
              console.log(data)
              handleSearch(); // Trigger search on Enter key
            }
          };
      return (
            <input
            type="text"
            value={query}
            placeholder={text}
            className="h-42px border p-2 w-full rounded-md bg-[#F2EBEB]"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            />
      );
};    

