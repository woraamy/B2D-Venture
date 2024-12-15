"use client";
import { useState } from "react";

export default function SearchBar({ text, data, onSearch, obj}) {
    const [query, setQuery] = useState('');
    const [isFound, setIsFound] = useState(true);

    const handleSearch = async () => {
        setIsFound(true); // Reset found state
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, value: query, obj }),
            });

            if (!response.ok) throw new Error("Search failed");

            const results = await response.json();
            if (!results || results.length === 0) {
                setIsFound(false);
            }
            onSearch(results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full">
            <input
                type="text"
                value={query}
                placeholder={text}
                className="h-42px border p-2 w-full rounded-md bg-[#F2EBEB]"
                onChange={(e) => { setQuery(e.target.value); }}
                onKeyDown={handleKeyDown}
            />
            {!isFound && (
                <div className="relative">
                    <p className="text-red-500 text-2xl mt-5">No match is found</p>
                </div>
            )}
        </div>
    );
}
