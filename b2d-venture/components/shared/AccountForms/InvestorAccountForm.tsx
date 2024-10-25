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
    email: z
    .string()
    .email({
        message: "Please enter a valid email address.",
    })
    .optional(),
    investor_description: z.string().max(160).optional(),
    first_name: z
    .string()
    .max(160)
    .optional(),
    last_name: z
    .string()
    .max(160)
    .optional(),
    contact_number: z
    .string()
    .max(160)
    .optional(),
    birthday: z
    .string()
    .max(160)
    .optional(),
    nationality: z
    .string()
    .max(160)
    .optional(),
})

type AccountFormValues = z.infer<typeof investorAccountFormSchema>

// Default values
const defaultValues: Partial<AccountFormValues> = {
}

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                This will be used for notifications and account recovery.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investor_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (optional)</FormLabel>
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
