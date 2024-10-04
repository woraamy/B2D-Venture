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
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Contact Number is required" }),
  birthday: z
    .date({
      required_error: "Date of birth is required",
    })
    .refine((date) => {
      const now = new Date();
      const minDate = new Date(now.getFullYear() - 20, now.getMonth(), now.getDate());
      return date <= now && date <= minDate;
    }, {
      message: "You must be at least 20 years old and the date cannot be in the future"
    }),
  nationalId: z.string().min(1, { message: "National ID is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  netWorth: z.number().min(1, { message: "Net worth should be greater than 0" }),

  /* For create account */
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
      path: ["confirmPassword"], // Path to where the error should show
    });
  }
});

interface RegisterInvestorProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterInvestor = ({ onFormValidated }: RegisterInvestorProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: undefined,
      nationalId: "",
      nationality: "",
      netWorth: 0,
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
      <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}>
        {/* Investor Information Title */}
        <h2 className="p-medium-18 mt-10 ml-14">Investor Information</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 p-4 ml-10 mr-10">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name
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
                  Last Name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="last-name" placeholder="Last Name" {...field} />
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
                  Your E-mail
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="e.g. example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact Number
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="phone" type="tel" placeholder="e.g. +XX XXX XXX XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of birth */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Date of birth
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="birthday"
                    type="date"
                    value={field.value ? field.value.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined;
                      field.onChange(date);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* National ID */}
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Your National ID Card
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="national-id" placeholder="e.g. 123456789012" {...field} />
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
                <FormLabel>
                  Your Nationality
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input id="nationality" placeholder="Select your nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Net Worth */}
          <FormField
            control={form.control}
            name="netWorth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Approximate net worth in USD
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="net-worth"
                    type="number"
                    min="0"
                    placeholder="Net worth"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      field.onChange(value);
                    }}
                  />
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
