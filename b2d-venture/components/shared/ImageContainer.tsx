"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function ImageContainer({data, onSubmit,onDelete, setIsDialogOpen}) {
    const [selectedImages, setSelectedImages] = useState([]);
 
      if (data.length === 0) {
        return <div className="text-center">No images available</div>;
      }

      const handleCheckboxChange = (file) => {
        setSelectedImages((prevChecked) => {
          if (prevChecked.includes(file)) {
            return prevChecked.filter((image) => image !== file);
          } else {
            return [...prevChecked, file];
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
      async function handleDelete(){
        try{
          for (const item of selectedImages){
            const response = await fetch(`/api/file/delete/${item._id}/asset`,{
              method: 'DELETE', 
              headers: {
              'Content-Type': 'application/json', 
          },})
            if (!response.ok) {
              throw new Error(`Failed to delete file with ID ${item._id}`);
            }
            onDelete();
            console.log(`File with ID ${item._id} deleted successfully`);
          }
          } catch(error){
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
                    checked={selectedImages.includes(item)}
                    onCheckedChange={() => handleCheckboxChange(item)} 
                    className="flex relative h-[35%] w-[20%] border-white border-8 rounded-lg shadow-lg hover:border-slate-400" 
                    style={{
                        backgroundImage: `url(${item.file_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        }} />
            ))}
            </div>
            <div className="flex gap-4">'
              <Button className='relative text-white' onClick={handleSubmit}>
                  Select
              </Button>
              <Button className='relative text-white' onClick={handleDelete}>
                  Delete
              </Button>
            </div>
            
                
        </div>

    );
}