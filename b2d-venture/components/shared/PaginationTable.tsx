"use client"
import { useState } from "react";
import TableCard from "@/components/shared/TableCard";
import { Button } from "@/components/ui/button";


export default function PaginationTable({data, itemsPerPage, buttonIndex, onDelete, onEdit}) {
    
    // Set up pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get data for the current page
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            {paginatedData.map((item, index) => {
                    const id = item[buttonIndex]?.value?.id; // Ensure safe access to the ID
                    return (
                        <TableCard
                            key={index}
                            data={item}
                            onDelete={id ? () => onDelete(id) : undefined}
                            className='mt-3'
                            valueClassname='font-semibold'
                            onEdit={() => onEdit}
                        />
                    );
                })}
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
