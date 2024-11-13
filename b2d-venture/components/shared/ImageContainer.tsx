"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function ImageContainer({id}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState(new Set());
    async function fetchData(){
        const response = await fetch(`/api/fetchingData/getFilebyCampaignId?campaignId=${id}`);
        const data = await response.json();
        setData(data.file || []);
    }
    useEffect(()  => {
        fetchData()
        setIsLoading(false)
      }, [])
    
      if (isLoading) {
        return (
          <div className="absolute bottom-5 left-1/4 w-full flex items-center justify-center">
            <img
              src="/assets/icons/icons-loading.gif"
              alt="Loading"
              className="object-contain"
            />
            <div className="loader">Loading...</div>
          </div>
        );
      }
    
      if (data.length === 0) {
        return <div className="text-center">No images available</div>;
      }

      const handleCheckboxChange = (filePath) => {
        setSelectedImages((prevSelected) => {
          const newSelected = new Set(prevSelected);
          if (newSelected.has(filePath)) {
            newSelected.delete(filePath);
          } else {
            newSelected.add(filePath);
          }
          return newSelected;
        });
      };

      async function handleSubmit(){
        try{
          console.log("asd")
        }catch(error){
            console.log(error)
        };
    }

    return (
        <div>
            <div className="flex h-[40vh] w-[57vw]">
            {data.map((item, index) => (
                <Checkbox 
                    onChange={() => handleCheckboxChange(item.file_path)}
                    className="flex relative h-[35%] w-[20%] border-white border-8 rounded-lg shadow-lg hover:border-slate-400" 
                    style={{
                        backgroundImage: `url(${item.file_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        }}>
                </Checkbox>
                
                // </div>
            ))}
            </div>
            <Button className='relative text-white' onClick={handleSubmit}>
                        Select
            </Button>
                
        </div>

    );
}