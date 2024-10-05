"use client";

import Footer from "@/components/shared/Footer";
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import RegisterInvestor from "@/components/shared/Register_investor";
import Register_company from "@/components/shared/Register_company";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function SignUp() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidated, setFormValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
    if (session) redirect('/');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentStep(2);
    setFormValidated(false); // Reset validation state when role changes
    setSubmitted(false); // Reset submission state when role changes
  };

  const handleFormValidated = (isValid: boolean) => {
    if (isValid) {
      setSubmitted(true); // Set the submitted state to true when form is valid
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  };

  const handleInvestorSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
        setError("Password do not match!");
        return;
    }

    if (!name || !email || !password || !confirmPassword) {
        setError("Please complete all inputs.");
        return;
    }

    const resCheckUser = await fetch("http://localhost:3000/api/usercheck", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    })

    const { user } = await resCheckUser.json();

    if (user) { 
        setError("User already exists.");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })

        if (res.ok) {
            const form = e.target;
            setError("");
            setSuccess("User registration successfully!");
            form.reset();
        } else {
            console.log("User registration failed.")
        }

    } catch(error) {
        console.log("Error during registration: ", error)
    }
}


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
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center space-y-2 md:space-x-8 md:space-y-0 mt-10">        
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number1.svg" alt="Number 1 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p
            className={`text-sm md:text-lg cursor-pointer transition-colors duration-300 ${currentStep === 1 ? 'text-red-500' : 'text-gray-500'}`}
          >
            Select your role
          </p>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number2.svg" alt="Number 2 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p
            className={`text-sm md:text-lg cursor-pointer transition-colors duration-300 ${currentStep === 2 && !submitted ? 'text-red-500' : 'text-gray-500'}`}
          >
            Enter your details
          </p>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex items-center space-x-2">
          <img src="/assets/icons/number3.svg" alt="Number 3 Icon" className="w-6 h-6 md:w-8 md:h-8" />
          <p className={`text-sm md:text-lg ${formValidated ? 'text-red-500' : 'text-gray-500'} cursor-pointer transition-colors duration-300`}>
            Waiting for approval
          </p>
        </div>
      </div>

      {/* Conditionally render Tabs and Role Selection */}
      {!submitted && (
        <>
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
              <RegisterInvestor onFormValidated={handleFormValidated} />
            ) : selectedRole === "company" ? (
              <Register_company onFormValidated={handleFormValidated} />
            ) : (
              <div className="text-center mt-10">Please select a role to continue</div>
            )}
          </div>

          {/* Already have an account */}
          <p className="mt-10 flex justify-center items-center space-x-2 mb-20">
            <span className="text-sm md:text-base">Already have an account?</span>
            <a href="/login" className="text-[#FF6347] font-medium">Login here</a>
          </p>
        </>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="text-center">
        <div className="flex justify-center items-center mt-16 mb-10">
          <img src="/assets/icons/success.svg" alt="Success icon" className="w-20 h-20 md:w-30 md:h-30" />
        </div>
          <p className="text-lg md:text-2xl font-bold text-[#4BB543]">Your details have been submitted successfully.</p>
          <p className="text-lg md:text-2xl font-bold text-[#4BB543]">Please wait for approval to create your account.</p>
          <Button asChild className="mt-10 mb-20 w-[200px] md:w-[300px] h-[50px] rounded-full text-white bg-[#FF993B] hover:bg-[#FF7A00] text-base md:text-lg">
              <Link href="/">
                Back to Home
              </Link>
          </Button>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default SignUp;
