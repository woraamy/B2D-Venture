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
  userName: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters" }),
});

interface RegisterInvestorProps {
  onFormValidated: (isValid: boolean) => void;
}

const RegisterInvestor = ({ onFormValidated }: RegisterInvestorProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
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
                  <Input id="userName" placeholder="e.g. Amy1234" {...field} />
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
                  <Input id="email" placeholder="e.g. example@example.com" {...field} />
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
                  <Input id="password" placeholder="Minimum 8 charaters" {...field} />
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
