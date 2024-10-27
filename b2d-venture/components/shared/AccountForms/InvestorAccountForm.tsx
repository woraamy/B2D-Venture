"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
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
import { useState } from "react"

// Schema for form validation
const investorAccountFormSchema = z.object({
    profilePicture: z.any().optional(), // Profile picture is optional
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    investor_description: z.string().max(160).optional(),
    first_name: z
      .string()
      .max(160, {
        message: "First name must not exceed 160 characters.",
      })
      .optional(),
    last_name: z
      .string()
      .max(160, {
        message: "Last name must not exceed 160 characters.",
      })
      .optional(),
    contact_number: z
      .string()
      .max(15, {
        message: "Contact number must not exceed 15 characters.",
      })
      .optional(),
    birthdate: z.string().optional(),
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

export function InvestorAccountForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(investorAccountFormSchema),
    defaultValues,
  })

  const { toast } = useToast()

  // handle profile picture upload and preview
  function handleProfilePictureChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="flex flex-col">
          {previewImage ? (
            <img
              src={previewImage}
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
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-2"
          />
          <FormDescription>
            Please upload an image for your profile (optional).
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="first_name"
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

        <FormField
          control={form.control}
          name="last_name"
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

        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Your contact number" {...field} />
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
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthdate</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
                <Input placeholder="Your nationality" {...field} />
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
                <Input placeholder="Tell us about yourself" {...field} />
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
