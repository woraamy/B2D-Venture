"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BusinessCard from "./BusinessCard";

export default function BusinessCardPagination({data,itemsPerPage}){
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length/itemsPerPage)
    const paginationData = data.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
    return(
        <div>
             <div className="flex flex-wrap gap-4 justify-center ">
                {paginationData.map((campaign,index) =>(
                        <Link href={`/business/${campaign._id}`} passHref key={campaign._id}>
                        <BusinessCard
                        className="mt-10"
                        coverimg = {campaign.business_id.coverimg}
                        profile= {campaign.business_id.profile}
                        name= {campaign.business_id.BusinessName}
                        description={campaign.business_id.description}
                        raised={campaign.raised}
                        min={campaign.min_investment}
                        valuation={campaign.business_id.valuation}
                        link={`/business/${campaign.business_id.BusinessName}`}
                        tag = {campaign.business_id.tag_list}
                    />
                    </Link>
                    ))}
            </div>
                 {/* Pagination controls */}
            <div className="flex justify-between mt-20">
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
    )

}