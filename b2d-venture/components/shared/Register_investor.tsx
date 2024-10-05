"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";


// Define the validation schema with zod
const FormSchema = z.object({
  userName: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password should be at least 8 characters" }),
});

interface RegisterInvestorProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterInvestor = ({ onFormValidated }: RegisterInvestorProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Form submitted successfully",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    onFormValidated(true);
  };

  const handleFormError = () => {
    onFormValidated(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-8 md:p-16">
          
          {/* Username */}
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username 
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" onChange={(e) => setName(e.target.value)} id="userName" placeholder="e.g. Amy1234" {...field} />
                </FormControl>
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
                <FormLabel>
                  Email
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="e.g. example@example.com" {...field} />
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
                <FormLabel>
                  Password
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Minimum 8 charaters" {...field} />
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
                <FormLabel>
                  Password Confirmation
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="w-[200px] md:w-[300px] h-[50px] rounded-full text-white bg-[#FF993B] hover:bg-[#FF7A00] text-base md:text-lg">
            Submit your details
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterInvestor;
