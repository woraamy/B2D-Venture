"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define a schema using Zod for form validation
const schema = z.object({
  email: z.string().email("Please enter a valid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>; // Create type from the schema

const Login = () => {
  const [email, setEmail] = useState("");   // State to store email
  const [password, setPassword] = useState(""); // State to store password

  // Function to check if both email and password are filled
  const isFormValid = () => email.length > 0 && password.length > 0;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FFF5EE]">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-8 relative">
        <a href="/" className="absolute top-10 left-20 text-2xl font-bold text-[#FF6347]">B2D Venture</a>

        {/* Placeholder for the image */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <img
              src="/assets/images/rocket-gif.gif"
              alt="Rocket with Laptop"
              className="w-full h-full object-contain"
            />
          </div>
      </div>

      {/* Right side (Login form) */}
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <a href="/" className="absolute top-10 left-4 md:hidden flex items-center">
          <ChevronsLeft className="text-[#FF6347] text-2xl cursor-pointer" />
          <p className="text-[#FF6347] p-medium-16 ml-2">
            Back to home
          </p>
        </a>
        <h1 className="text-5xl font-bold text-center text-[#FF6347] mt-10">Welcome back</h1>
        <p className="text-center mt-5 text-lg">Welcome back! Please enter your details to log into your account</p>

        <form className="space-y-5">
        <div className="flex justify-center">
            <input 
              type="email"  
              placeholder="Your email"
              className="mt-10 w-[300px] md:w-[450px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#FF7A00]" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state
              required 
            />
          </div>
          <div className="flex justify-center">
            <input 
              type="password" 
              placeholder="Your Password" 
              className="w-[300px] md:w-[450px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#FF7A00]" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state
              required 
            />
          </div>
          
          <div className="flex justify-between items-center mt-5 w-[300px] md:w-[450px] mx-auto">
            <label className="flex items-center text-sm md:text-lg">
              <input
                type="checkbox"
                className="mr-2 form-checkbox text-yellow-500 focus:ring-yellow-500 rounded-full"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-500 text-sm md:text-lg">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              asChild 
              className={`w-[300px] md:w-[450px] h-[50px] rounded-full text-white ${isFormValid() ? 'bg-[#FF993B] hover:bg-[#FF7A00]' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid()}  // Disable button if form is not valid
            >
              <Link href={isFormValid() ? "/" : "#"}> {/* Only navigate if valid */}
                Login
              </Link>
            </Button>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="w-[300px] md:w-[450px] h-[50px] border-2 border-[#D9D9D9] rounded-full text-[#1C0E0D] bg-white hover:bg-[#D9D9D9]">
              <img src="assets/icons/google-logo.png" alt="Google logo" height={23} width={23} className="mr-2" />
              <Link href="/">
                Login with Google
              </Link>
            </Button>
          </div>
        </form>

        <p className="mt-10 flex justify-center items-center space-x-2">
          <span className="text-sm md:text-base">Don't have an account?</span>
          <a href="/signup" className="text-[#FF6347] font-medium">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
