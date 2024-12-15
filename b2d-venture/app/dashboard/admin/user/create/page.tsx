"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import RegisterInvestor from "@/components/shared/Register_investor";
import { Password } from 'primereact/password';
import RegisterBusiness from "@/components/shared/RegisterBusiness";


export default function page(){
    const [role, setRole] = useState("investor")
    const [addAdmin, setAddAdmin] = useState("");
    const [formValidated, setFormValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleAdminSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target);
        const response = await fetch(`/api/register/admin`, {
            method: 'POST',
            body: formData,
        });
    
        const result = await response.json();
        if (response.ok) {
            toast.success("Add admin success!");  
            setAddAdmin("Add admin success!")
        } else {
            toast.error(result.error || 'Failed to edit raise campaign'); 
        }
    }

    const handleFormValidated = (isValid: boolean) => {
        if (isValid) {
          setSubmitted(true); // Set the submitted state to true when form is valid
          setFormValidated(true);
        
        } else {
          setFormValidated(false);
        }
      };
      if (role === "business"){
        return (
          <div>
            <Toaster />
            <div className="flex mt-10 ml-24">
                  <span className="text-xl text-gray-400" onClick={() => setRole("investor")}> Investor </span>
                  <span className="text-xl ml-10 text-[#FF553E] underline" onClick={() => setRole("business")}> Business </span>
                  <span className="text-xl ml-10 text-gray-400" onClick={() => setRole("admin")}> Admin </span>
            </div>
            <div className="flex flex-col mt-5 mb-10 justify-center items-center w-[85vw]">
              <h1 className="text-xl font-semibold">Create Business</h1>
              <RegisterBusiness onFormValidated={handleFormValidated}/>
            </div>
          </div>
        )
      } else if(role === "admin"){
        return (
          <div>
            <div className="flex mt-10 ml-24">
                  <span className="text-xl text-gray-400 cursor-pointer" onClick={() => setRole("investor")}> Investor </span>
                  <span className="text-xl ml-10 text-gray-400 cursor-pointer" onClick={() => setRole("business")}> Business </span>
                  <span className="text-xl ml-10 text-[#FF553E] underline cursor-pointer" onClick={() => { setRole("admin"); }}> Admin </span>
            </div>
            <form method="post" onSubmit={handleAdminSubmit}>
              <div className="flex flex-col mt-24 justify-center items-center w-[85vw]">
              <h1 className="text-xl font-semibold">Create Admin</h1>

              <table className="text-[16px] py-5 mt-5">
                  <tr>
                      <td className="w-[60%] py-2">Username</td>
                      <td className="w-[100%]">
                          <input
                              type="text"
                              name="name"
                              className="mt-5 ml-5 block w-full p-2 border border-gray-300 rounded-md"
                              />
                      </td>
                  </tr>
                  <tr>
                      <td className="w-[60%] py-2">Password</td>
                      <td className="w-[100%] ">
                          <Password
                              type="password"
                              name="password1"
                              className="mt-5 ml-5 block w-full p-2 bg-white border border-gray-300 rounded-md"
                              />
                      </td>
                  </tr>
                  <tr>
                      <td className="w-[60%] py-2">Confirm Password</td>
                      <td className="w-[100%]">
                          <Password
                              type="password"
                              name="password2"
                              className="mt-5 ml-5 block w-full p-2 bg-white border border-gray-300 rounded-md"
                              />
                      </td>
                  </tr>
                  <tr>
                      <td className="w-[60%] py-2">Email</td>
                      <td className="w-[100%]">
                          <input
                              type="text"
                              name="email"
                              className="mt-5 ml-5 block w-full p-2 border border-gray-300 rounded-md"
                              />
                      </td>
                  </tr>
              </table>
            <Button className="mt-10 w-[30%] " type="submit">Add Admin user</Button>
            <span className="mt-5">{addAdmin}</span>
            </div>
            </form>
          </div>
        )
      }
    return (
        <div className="w-[85vw] ">
            <Toaster />
            <div className="flex mt-10 ml-24">
                  <span className="text-xl text-[#FF553E] underline cursor-pointer" onClick={() => { setRole("investor"); }}> Investor </span>
                  <span className="text-xl ml-10 text-gray-400 cursor-pointer" onClick={() => setRole("business")}> Business </span>
                  <span className="text-xl ml-10 text-gray-400 cursor-pointer" onClick={() => setRole("admin")}> Admin </span>
            </div>
            <div className="flex flex-col mt-24 justify-center items-center w-[85vw]">
            <h1 className="text-xl font-semibold">Create Investor</h1>
            <RegisterInvestor onFormValidated={handleFormValidated} />
            </div>
    </div>
    )
}