"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function ImageContainer({data, onSubmit, setIsDialogOpen}) {
    const [selectedImages, setSelectedImages] = useState([]);
 
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