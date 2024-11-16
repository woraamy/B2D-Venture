"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useState } from "react";

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
      role: "investor",
    },
  });

  const handleInvestorSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { username, email, password, role } = data;

    try {
      const res = await fetch("http://localhost:3000/api/register/investor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successful!");
        toast({
          title: "Registration Success",
          description: `Welcome ${username}!`,
        });
        form.reset(); // Reset form after successful submission
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInvestorSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-8 md:p-16">
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