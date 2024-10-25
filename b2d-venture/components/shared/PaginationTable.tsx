"use client"
import { useState } from "react";
import TableCard from "@/components/shared/TableCard";
import { Button } from "@/components/ui/button";


export default function PaginationTable({data,itemsPerPage}) {
    
    // Set up pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get data for the current page
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <div>
                {paginatedData.map((item, index) => (
                    <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold' />
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between mt-5">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
);
}
