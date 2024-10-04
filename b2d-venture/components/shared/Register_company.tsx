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
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  companyAddress: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  stateProvince: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal/Zip code is required" }),
});

interface RegisterCompanyProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterCompany = ({ onFormValidated }: RegisterCompanyProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      contactNumber: "",
      email: "",
      companyAddress: "",
      city: "",
      stateProvince: "",
      postalCode: ""
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-8 md:p-16">
          
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Owner First Name
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
                  Company Owner Last Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="last-name" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="company-name" placeholder="Company Name" {...field} />
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

export default RegisterCompany;
