"use client";

import Footer from "@/components/shared/Footer";
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import RegisterInvestor from "@/components/shared/Register_investor";
import Register_company from "@/components/shared/Register_company";

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // To track the current step: 1 -> Select Role, 2 -> Enter Details

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentStep(2); // Move to the next step
  };

  return (
    <div className="signUp-bg relative">
      {/* Logo and Back to Home */}
      <a href="/" className="absolute top-10 left-20 text-2xl font-bold text-[#FF6347] hidden md:block">
        B2D Venture
      </a>
      <a href="/" className="absolute top-10 left-4 md:hidden flex items-center">
        <ChevronsLeft className="text-[#FF6347] text-2xl cursor-pointer" />
        <p className="text-[#FF6347] p-medium-16 ml-2">Back to home</p>
      </a>

      {/* Title */}
      <p className="flex-center text-3xl md:text-5xl font-bold text-[#FF6347] mt-32">Join the Community</p>

      {/* Center guidance */}
      <div className="flex flex-wrap justify-center space-x-8 mt-10">
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number1.svg" alt="Number 1 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p
            className={`text-sm md:text-lg cursor-pointer transition-colors duration-300 ${currentStep === 1 ? 'text-red-500' : 'text-black'}`}
          >
            Select your role
          </p>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number2.svg" alt="Number 2 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p
            className={`text-sm md:text-lg cursor-pointer transition-colors duration-300 ${currentStep === 2 ? 'text-red-500' : 'text-gray-500'}`}
          >
            Enter your details
          </p>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number3.svg" alt="Number 3 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p className="text-sm md:text-lg text-gray-500 cursor-pointer transition-colors duration-300">
            Pending review
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs className="mt-10 flex justify-center">
        <TabsList className="w-[300px] md:w-[500px] md:h-[45px]">
          <TabsTrigger
            value="investor"
            className={`transition-all text-sm md:text-base duration-300 shadow-md w-1/2 text-center ${selectedRole === 'investor' ? 'bg-white text-black shadow-lg' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => handleRoleSelect("investor")}
          >
            Investor
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className={`transition-all text-sm md:text-base duration-300 shadow-md w-1/2 text-center ${selectedRole === 'company' ? 'bg-white text-black shadow-lg' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => handleRoleSelect("company")}
          >
            Company
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conditional rendering of forms */}
      <div>
        {selectedRole === "investor" ? (
          <RegisterInvestor />
        ) : selectedRole === "company" ? (
          <Register_company />
        ) : (
          <div className="text-center mt-10">Please select a role to continue</div>
        )}
      </div>

      {/* Already have an account */}
      <p className="mt-10 flex justify-center items-center space-x-2 mb-20">
        <span className="text-sm md:text-base">Already have an account?</span>
        <a href="/Login" className="text-[#FF6347] font-medium">Login here</a>
      </p>
      <Footer />
    </div>
  );
};

export default SignUp;
