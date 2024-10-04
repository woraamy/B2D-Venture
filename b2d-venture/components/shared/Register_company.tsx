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
};

export default RegisterCompany;
