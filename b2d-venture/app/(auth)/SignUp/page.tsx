"use client";

import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Register_investor from "@/components/shared/Register_investor";
import Register_company from "@/components/shared/Register_company";

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("investor");

  return (
    <div className="signUp-bg relative">
      {/* Logo and Back to Home */}
      <a href="/" className="absolute top-10 left-20 text-2xl font-bold text-[#FF6347] hidden md:block">
        B2D Venture
      </a>
      <a href="/" className="absolute top-10 left-4 md:hidden flex items-center">
        <ChevronsLeft className="text-[#FF6347] text-2xl cursor-pointer" />
        <p className="text-[#FF6347] p-medium-16 ml-2">
          Back to home
        </p>
      </a>

      {/* Title */}
      <p className="flex-center text-5xl font-bold text-[#FF6347] mt-32">Join the Community</p>

      {/* Center guidance */}
      <div className="flex justify-center space-x-36 mt-10">
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number1.svg" alt="Number 1 Icon" className="w-8 h-8" />
          <p className="text-lg hover:text-[#FF6347] cursor-pointer transition-colors duration-300">
            Select your role
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number2.svg" alt="Number 2 Icon" className="w-8 h-8" />
          <p className="text-lg hover:text-[#FF6347] cursor-pointer transition-colors duration-300">
            Enter your details
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number3.svg" alt="Number 3 Icon" className="w-8 h-8" />
          <p className="text-lg hover:text-[#FF6347] cursor-pointer transition-colors duration-300">
            Pending review
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs className="mt-10 flex justify-center">
        <TabsList className="w-[500px] h-[50px]">
          <TabsTrigger
            value="investor"
            className={`transition-all text-lg duration-300 shadow-md w-1/2 text-center ${selectedRole === 'investor' ? 'bg-white text-black shadow-lg' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => setSelectedRole("investor")}
          >
            Investor
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className={`transition-all text-lg duration-300 shadow-md w-1/2 text-center ${selectedRole === 'company' ? 'bg-white text-black shadow-lg' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => setSelectedRole("company")}
          >
            Company
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conditional rendering of forms */}
      <div className="mt-10">
        {selectedRole === "investor" ? (
          <Register_investor />
        ) : (
          <Register_company />
        )}
      </div>

      {/* Already have an account */}
      <p className="mt-10 flex justify-center items-center space-x-2">
        <span className="text-sm md:text-base">Already have an account?</span>
        <a href="/Login" className="text-[#FF6347] font-medium">Login here</a>
      </p>
    </div>
  );
};

export default SignUp;
