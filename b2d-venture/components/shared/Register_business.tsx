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

// Define the validation schema with zod
const FormSchema = z.object({
  // Business Information Schema
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  BusinessName: z.string().min(1, { message: "Business name is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  BusinessAddress: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  stateProvince: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal/Zip code is required" }),

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
      username: "",
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
                  <Input id="first-name" placeholder="First Name" {...field} />
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
                  <Input id="last-name" placeholder="Last Name" {...field} />
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
                  <Input id="Business-name" placeholder="Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact Number
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="contact-number" type="tel" placeholder="e.g. +XX XXX XXX XXXX" {...field} />
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
                  <Input id="Business-address" placeholder="Address" {...field} />
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
                  <Input id="state-province" placeholder="State / Province" {...field} />
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
                  <Input id="postal-code" placeholder="Postal / Zip Code" {...field} />
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
