"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

const FormSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password should be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password should be at least 8 characters" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    birthDate: z.string().min(1, { message: "Birth date is required" }),
    nationality: z.string().min(1, { message: "Nationality is required" }),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    role: z.literal("investor"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface RegisterInvestorProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterInvestor = ({ onFormValidated }: RegisterInvestorProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      nationality: "",
      contactNumber: "",
      role: "investor",
    },
  });

  const handleInvestorSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { username, email, password, role } = data;

    try {
      if (!isVerified){
        toast.error("Please verify that you are not a robot.")
      } else if (!isChecked) {
        toast.error("Please accept term of service and privacy policy to sign up.");
      } else {
        const res = await fetch("http://localhost:3000/api/register/investor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
            role: "investor",
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            nationality: data.nationality,
            contactNumber: data.contactNumber,
          }),
        });
  
        if (res.ok) {
          setError("");
          setSuccess("User registration successful!");
          toast.success("Registration Success");
          form.reset(); // Reset form after successful submission
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Registration failed.");
        }
      }
      
    } catch (error) {
      setError("An error occurred during registration.");
      console.error("Error during registration:", error);
    }
  };

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api/captcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(handleInvestorSubmit)} className="space-y-5">

        <h2 className="p-medium-20 mt-10 ml-14">Investor Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-4 ml-10 mr-10">

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Amy1234" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Minimum 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="Your nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        

            {/* First Name */}
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="Tell us about your interests" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        </div>  
        <div className="flex justify-center">
          <label className="flex items-center text-sm md:text-md">
              <input 
                type="checkbox" 
                className="mr-2 form-checkbox text-yellow-500 focus:ring-yellow-500 rounded-full" 
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I have read and accept the <Link href="/term-of-service" className="font-bold text-blue-600"> Terms of Service </Link> and <Link href="/privacy-policy" className="font-bold text-blue-600"> Privacy Policy </Link>. 
            </label>
            </div>
        <div className="flex justify-center">
          <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                ref={recaptchaRef}
                onChange={handleChange}
                onExpired={handleExpired}
              />     
          </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-[200px] md:w-[300px] h-[50px] rounded-full text-white bg-[#FF993B] hover:bg-[#FF7A00] text-base md:text-lg">
            Submit your details
          </Button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </form>
    </Form>
  );
};

export default RegisterInvestor;
