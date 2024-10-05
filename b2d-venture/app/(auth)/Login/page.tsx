"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from 'lucide-react';
import Link from "next/link";
import { signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);



  const handleSubmit = async (e) => {
      e.preventDefault();

      try {

          const res = await signIn("credentials", {
              email, password, redirect: false,
              callbackUrl: "/"
          })

          if (res.error) {
              setError("Invalid credentials");
              return;
          }

          router.replace("/");

      } catch(error) {
          console.log(error);
      }
  }



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
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center p-8 bg-white" >
        <a href="/" className="absolute top-10 left-4 md:hidden flex items-center">
          <ChevronsLeft className="text-[#FF6347] text-2xl cursor-pointer" />
          <p className="text-[#FF6347] p-medium-16 ml-2">
            Back to home
          </p>
        </a>
        <h1 className="text-5xl font-bold text-center text-[#FF6347] mt-10">Welcome back</h1>
        <p className="text-center mt-5 text-lg">Welcome back! Please enter your details to log into your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center">
            <input 
              type="text" 
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-10 w-[300px] md:w-[450px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div className="flex justify-center">
            <input 
              type="password" 
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] md:w-[450px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#FF7A00]" />
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
            <button type="submit" className="w-[300px] md:w-[450px] h-[50px] rounded-full text-white bg-[#FF993B] hover:bg-[#FF7A00]">
                  Login
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <button onClick={() => signIn("google")} className="w-[300px] md:w-[450px] h-[50px] border-2 border-[#D9D9D9] rounded-full text-[#1C0E0D] bg-white hover:bg-[#D9D9D9]">
              <img src="assets/icons/google-logo.png" alt="Google logo" height={23} width={23} className="mr-2" />
                Login with Google
            </button>
          </div>
        </form>

        <p className="mt-10 flex justify-center items-center space-x-2">
          <span className="text-sm md:text-base">Don't have an account?</span>
          <a href="/SignUp" className="text-[#FF6347] font-medium">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
