"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/searchbar";
import Filter from "@/components/shared/filter";
import BusinessCardPagination from "@/components/shared/BusinessCardPagination";
import { Toaster } from "react-hot-toast";

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // month is 0-based, so subtract 1
}

export default function Page() {
    const tag = ["Aerospace", "Food & Drinks", "Shop", "Technology", "Innovation", "Transportation", "Energy", "AI & Machine Learning"];
    const select = ["Newest", "Oldest", "Popular", "Nearly close"];
    const [data, setData] = useState(null); // Start with null for a loading state
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/fetchingData/RaiseCampaign`);
            const res = await response.json();
            const now = new Date();
            const filteredData = res.data.filter((item) => {
                const startDate = parseDate(item.start_date);
                return item.status === "open" && startDate < now;
            });
            setData(filteredData || []);
            setInitialData(filteredData || []);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    const handleSearchResults = (newData) => {
        setData(newData?.length > 0 ? newData : initialData);
    };

    const handleFilter = (newData) => {
        setData(newData?.length > 0 ? newData : initialData);
    };

    return (
        <div className="max-w-[70%] mx-auto mt-20 mb-20">
            <Toaster />
            <h1 className="text-[#FF553E] text-[60px] font-semibold leading-[52px] tracking[-0.4px]">Businesses</h1>
            <p className="max-w-[70%] mt-10 text-sm/[20px]">
                Discover tomorrow&apos;s leaders with <b>B2D Venture</b>. Unlock opportunities across Southeast Asia. Dive into the dynamic business landscape, connect with emerging startups, and explore investment prospects shaping the region&apos;s future growth.
            </p>
            <div className="flex mt-10">
                <SearchBar
                    text="Search Business"
                    data={initialData || []}
                    onSearch={handleSearchResults}
                    obj={"business_id.BusinessName"}
                />
                <Filter
                    className="ms-5"
                    onSubmit={handleFilter}
                    data={initialData || []}
                    obj="business_id.tag_list"
                    tag={tag}
                    select={select}
                    timeKey="start_date"
                />
            </div>
            <div>
                <BusinessCardPagination data={data} itemsPerPage={12} />
            </div>
        </div>
    );
}
