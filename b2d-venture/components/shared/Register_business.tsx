"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "@/hooks/use-toast";
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
import { toast } from "react-hot-toast";

// Define the validation schema with zod
const FormSchema = z.object({
  // Business Information Schema
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  BusinessName: z.string().min(1, { message: "Business name is required" }),
  contactNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  BusinessAddress: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  stateProvince: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal/Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  description: z.string().min(1,{ message: "Description is require" }),
  tag_list: z
    .array(z.string())
    .min(1, { message: "At least one business type must be selected" }),

  // Business Account Schema
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters long" })
    .refine(
      (value) =>
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/.test(value),
      {
        message:
          "Password must contain at least three of the following: uppercase letters, lowercase letters, numbers, or symbols",
      }
    ),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  role: z.literal("business"),
  status: z.literal("pending"),
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords must match",
      path: ["confirmPassword"],
    });
  }
});

interface RegisterBusinessProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterBusiness = ({ onFormValidated }: RegisterBusinessProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      BusinessName: "",
      contactNumber: "",
      email: "",
      BusinessAddress: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      description: "",
      tag_list: [],
      username: "",
      password: "",
      confirmPassword: "",
      role: "business",
      status: "pending",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await handleBusinessSubmit(data);
      toast.success("Form submitted successfully!");
      onFormValidated(true);

    } catch (error) {
      setError("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  };

  const handleBusinessSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { firstName, 
            lastName, 
            BusinessName, 
            email, 
            contactNumber, 
            BusinessAddress, 
            city, 
            stateProvince, 
            postalCode, 
            country, 
            description,
            tag_list, 
            username, 
            password,
            role,
            status } = data;

    try {
      const res = await fetch("/api/register/businessRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          BusinessName,
          email,
          contactNumber,
          BusinessAddress,
          city,
          stateProvince,
          postalCode,
          country,
          description,
          tag_list,
          username,
          password,
          role:"business",
          status: "pending"
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("Business creation request has been sent.");
        form.reset(); 
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error("Error during registration:", error);
    }
  };

  const handleFormError = () => {
    onFormValidated(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)} className="space-y-5">
        {/* Business Information */}
        <h2 className="p-medium-20 mt-10 ml-14">Business Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-4 ml-10 mr-10">
          
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Owner First Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="First Name" {...field} />
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
                <FormLabel>
                  Business Owner Last Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="lastName" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Name */}
          <FormField
            control={form.control}
            name="BusinessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="BusinessName" placeholder="Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number (Optional) */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input id="contactNumber" type="tel" placeholder="e.g. +XX XXX XXX XXXX" {...field} />
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
                  E-mail
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="e.g. example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Address */}
          <FormField
            control={form.control}
            name="BusinessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Address
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="BusinessAddress" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="city" placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State/Province */}
          <FormField
            control={form.control}
            name="stateProvince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  State / Province
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="stateProvince" placeholder="State / Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Postal / Zip Code
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="postalCode" placeholder="Postal / Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="country" placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <textarea id="description" placeholder="Description" className="block w-full p-2 border h-[15vh] border-gray-300 rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Type of Business*/}
          <FormField
            control={form.control}
            name="tag_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Type of Business
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="Technology"
                        checked={field.value.includes("Technology")}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (field.value.includes(value)) {
                            field.onChange(
                              field.value.filter((val: string) => val !== value)
                            );
                          } else {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />{" "}
                      Technology
                    </label>
                    <label className="ml-4">
                      <input
                        type="checkbox"
                        value="Retail"
                        checked={field.value.includes("Retail")}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (field.value.includes(value)) {
                            field.onChange(
                              field.value.filter((val: string) => val !== value)
                            );
                          } else {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />{" "}
                      Retail
                    </label>
                    <label className="ml-4">
                      <input
                        type="checkbox"
                        value="Finance"
                        checked={field.value.includes("Finance")}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (field.value.includes(value)) {
                            field.onChange(
                              field.value.filter((val: string) => val !== value)
                            );
                          } else {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />{" "}
                      Finance
                    </label>
                    <label className="ml-4">
                      <input
                        type="checkbox"
                        value="Healthcare"
                        checked={field.value.includes("Healthcare")}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (field.value.includes(value)) {
                            field.onChange(
                              field.value.filter((val: string) => val !== value)
                            );
                          } else {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />{" "}
                      Healthcare
                    </label>
                    <label className="ml-4">
                      <input
                        type="checkbox"
                        value="Food & Beverage"
                        checked={field.value.includes("Food & Beverage")}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (field.value.includes(value)) {
                            field.onChange(
                              field.value.filter((val: string) => val !== value)
                            );
                          } else {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />{" "}
                      Food & Beverage
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Business Account Section */}
        <h2 className="p-medium-20 mt-10 ml-14">Business Account</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-4 ml-10 mr-10">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username  <span className="text-red-500"> *</span></FormLabel>
                <FormControl>
                  <Input id="username" placeholder="Username" {...field} />
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
                <FormLabel>Password <span className="text-red-500"> *</span></FormLabel>
                <FormControl>
                  <Input id="password" type="password" placeholder="Password" {...field} />
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
                <FormLabel>Confirm Password <span className="text-red-500"> *</span></FormLabel>
                <FormControl>
                  <Input id="confirmPassword" type="password" placeholder="Confirm Password" {...field} />
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

export default RegisterBusiness;
