"use client"
import { useState } from 'react';
import { Button } from './button';
import { IoFilter } from "react-icons/io5";

export default function SearchBar({text, data, onSearch, value, obj}){
      const [query, setQuery] = useState('');
      async function handleSearch() {
            const params = new URLSearchParams({
                  data: JSON.stringify(data),
                  value: value,
                  obj: obj
              });
            try {
                  const response = await fetch(`/api/search?${params.toString()}`,{ method: 'POST'});
                  if (!response.ok) {
                        throw new Error('Search request failed');
                  }
                  const data = await response.json();
                  console.log(data)
                  onSearch(data) //retreive data at the parent page
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

