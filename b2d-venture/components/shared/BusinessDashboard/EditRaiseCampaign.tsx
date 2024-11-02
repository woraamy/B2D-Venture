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
import { useState, useEffect } from "react"
import { description } from "@/components/charts/overviewchart"

// Schema for form validation
const editRaiseCampaignFormSchema = z.object({
    investor_description: z.string().max(160).optional(),
    min_investment: z
      .number()
      .optional(),
    max_investment: z
      .number()
      .optional(),
    goal: z
      .number()
      .optional(),
    description: z.string(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    files: z.array(z.string()).optional(),
})

type EditFormValues = z.infer<typeof editRaiseCampaignFormSchema>

// Default values
const defaultValues: Partial<EditFormValues> = {}

export function EditRaiseCampaignForm({params, data}) {
    const id = params;
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const form = useForm<EditFormValues>({
    resolver: zodResolver(editRaiseCampaignFormSchema),
    defaultValues,
    })
    const { toast } = useToast()
    
    async function onSubmit(data: EditFormValues) {
    try {
        const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:id, data, role:"raisecampaign" }),
        })

        const result = await response.json();

        if (response.ok) {
        toast({
            title: "Raise campaign updated successfully",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(result.investor, null, 2)}</code>
            </pre>
            ),
        })
        } else {
        toast({
            title: "Update failed",
            description: result.error,
            variant: "destructive",
        })
        }
    } catch (error) {
        toast({
        title: "Update failed",
        description: "An error occurred while updating your account.",
        variant: "destructive",
        })
        console.error("Error updating investor account:", error)
    }
    }


    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* <div className="flex flex-col">
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
        </div> */}

        <FormField
            control={form.control}
            name="min_investment"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Minimum Investment</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Minimum investment for investors" 
                    {...field}
                    defaultValue={data.min_investment || ""}
                      />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="max_investment"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Minimum Investment</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Maximum investment for investors" 
                    {...field}
                    defaultValue={data.max_investment || ""}
                      />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Goal" 
                    {...field}
                    defaultValue={data.goal || ""}
                      />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Start Date of your raise campaign</FormLabel>
                <FormControl>
                <Input 
                    type="date"
                    {...field} 
                    defaultValue={data.start_date ? data.start_date.slice(0, 10) : ""}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

         <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Start Date of your raise campaign</FormLabel>
                <FormControl>
                <Input 
                    type="date"
                    {...field} 
                    defaultValue={data.end_date ? data.end_date.slice(0, 10) : ""}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Raise campaign Description</FormLabel>
                <FormControl>
                <Input 
                    placeholder="Tell us about your raise campaign" 
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

        <Button type="submit">Update rasie campaign</Button>
        </form>
    </Form>
    )
    }
