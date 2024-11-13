"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import UploadInvestorProfile from "@/components/shared/InvestorDashboard/UploadInvestorProfile"
import { toast } from "react-hot-toast"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

// Schema for form validation
const investorAccountFormSchema = z.object({
    profilePicture: z.any().optional(), // Profile picture is optional
    investor_description: z.string().max(160).optional(),
    firstName: z
      .string()
      .max(160, {
        message: "First name must not exceed 160 characters.",
      })
      .optional(),
    lastName: z
      .string()
      .max(160, {
        message: "Last name must not exceed 160 characters.",
      })
      .optional(),
    contactNumber: z
      .string()
      .max(15, {
        message: "Contact number must not exceed 15 characters.",
      })
      .optional(),
    birthDate: z.string().optional(),
    nationality: z
      .string()
      .max(100, {
        message: "Nationality must not exceed 100 characters.",
      })
      .optional(),
})

type AccountFormValues = z.infer<typeof investorAccountFormSchema>

// Default values
const defaultValues: Partial<AccountFormValues> = {}

export function InvestorAccountForm({params, data}) {
    const id = params;
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const form = useForm<AccountFormValues>({
    resolver: zodResolver(investorAccountFormSchema),
    defaultValues,
    })
    
    async function onSubmit(data: AccountFormValues) {
        try {
          const response = await fetch(`/api/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, data, role: "investor" }), // Send the investorId and the form data
          });
    
          const result = await response.json();
    
          if (response.ok) {
            toast.success("Account updated successfully");
          } else {
            toast.error(result?.message || "Failed to update account");
          }
        } catch (error) {
          toast.error("An unexpected error occurred while updating the account.");
        }
      }


    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="flex flex-col">
            {data.profile_picture ? (
            <img
                src={data.profile_picture}
                alt="Profile preview"
                className="w-52 h-52 rounded-full object-cover mb-4"
            />
            ) : (
            <div className="w-52 h-52 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
            </div>
            )}

            <label className="font-medium text-gray-700">
            Profile Picture
            </label>
            <UploadInvestorProfile investor_id={id} />
            <FormDescription>
            Please upload an image for your profile (optional).
            </FormDescription>
        </div>

        <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Your first name" 
                    {...field}
                    defaultValue={data.firstName || ""}
                      />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Your last name" 
                    {...field}
                    defaultValue={data.lastName || ""} 
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Your contact number"  
                    {...field} 
                    defaultValue={data.contactNumber || ""}
                    />
                </FormControl>
                <FormDescription>
                Optional, but useful if we need to reach you directly.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Birthdate</FormLabel>
                <FormControl>
                <Input 
                    type="date"
                    {...field} 
                    defaultValue={data.birthDate ? data.birthDate.slice(0, 10) : ""}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Your nationality" 
                    {...field}
                    defaultValue={data.Nationality || ""}
                     />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="investor_description"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Investor Description</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Tell us about yourself" 
                    {...field}
                    defaultValue={data.description || ""}
                     />
                </FormControl>
                <FormDescription>
                This will be displayed on your profile.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />

        <Button type="submit">Update account</Button>
        </form>
    </Form>
    )
    }
