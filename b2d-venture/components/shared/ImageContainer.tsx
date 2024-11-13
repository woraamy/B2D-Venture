"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function ImageContainer({id, onSubmit, setIsDialogOpen}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
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
        setSelectedImages((prevChecked) => {
          if (prevChecked.includes(filePath)) {
            return prevChecked.filter((image) => image !== filePath);
          } else {
            return [...prevChecked, filePath];
          }
        });
      };
       function handleSubmit(){
       try{
            onSubmit(selectedImages)
            setIsDialogOpen(false); 
        }catch(error){
            console.log(error)
        };
    }

    return (
        <div>
            <div className="flex h-[40vh] w-[57vw]">
            {data.map((item, index) => (
                <Checkbox 
                    key= {index}
                    // value={item.file_path}
                    checked={selectedImages.includes(item.file_path)}
                    onCheckedChange={() => handleCheckboxChange(item.file_path)} 
                    className="flex relative h-[35%] w-[20%] border-white border-8 rounded-lg shadow-lg hover:border-slate-400" 
                    style={{
                        backgroundImage: `url(${item.file_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        }} />
            ))}
            </div>
            <Button className='relative text-white' onClick={handleSubmit}>
                Select
            </Button>
                
        </div>

    );
}