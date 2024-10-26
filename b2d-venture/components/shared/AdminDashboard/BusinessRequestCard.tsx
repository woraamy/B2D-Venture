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
import { Select } from "@/components/ui/select"
import { useState } from "react"

// List of business tags
const businessTags = [
  "Aerospace",
  "Food & Drinks",
  "Shop",
  "Technology",
  "Innovation",
  "Transportation",
  "Energy",
  "AI & Machine Learning",
]

// Schema for form validation
const businessFormSchema = z.object({
  profilePicture: z.any().optional(), // Profile picture is optional
  businessName: z
    .string()
    .min(2, {
      message: "Business name must be at least 2 characters.",
    })
    .max(50, {
      message: "Business name must not be longer than 50 characters.",
    }),
  website: z
    .string()
    .url({
      message: "Please enter a valid website URL.",
    })
    .optional(),
  bio: z.string().max(160).optional(),
  tags: z
    .array(
      z.enum([
        "Aerospace",
        "Food & Drinks",
        "Shop",
        "Technology",
        "Innovation",
        "Transportation",
        "Energy",
        "AI & Machine Learning",
      ])
    )
    .optional(),
})

type BusinessFormValues = z.infer<typeof businessFormSchema>

// Default values
const defaultValues: Partial<BusinessFormValues> = {
}

export function BusinessForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
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

  function onSubmit(data: BusinessFormValues) {
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
            Please upload an image for your business profile (optional).
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your business name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be publicly displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://yourbusiness.com" {...field} />
              </FormControl>
              <FormDescription>
                This will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about your business" {...field} />
              </FormControl>
              <FormDescription>
                This will be displayed on your business profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Select
                  multiple
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {businessTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormDescription>
                Choose tags that best describe your business.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update business</Button>
      </form>
    </Form>
  )
}
