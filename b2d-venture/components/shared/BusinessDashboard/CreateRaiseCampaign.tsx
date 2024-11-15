"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ToolsBar from "../ToolsBar";
import Link from '@tiptap/extension-link'
import Heading from "@tiptap/extension-heading";
import { useRouter } from "next/router";
// Schema for form validation (all fields required)
const createRaiseCampaignFormSchema = z.object({
  min_investment: z
    .number({ invalid_type_error: "Minimum investment must be a number" })
    .nonnegative("Minimum investment must be non-negative")
    .refine((value) => value !== undefined, {
      message: "Minimum investment is required",
    }),
  max_investment: z
    .number({ invalid_type_error: "Maximum investment must be a number" })
    .nonnegative("Maximum investment must be non-negative")
    .refine((value) => value !== undefined, {
      message: "Maximum investment is required",
    }),
  goal: z
    .number({ invalid_type_error: "Goal must be a number" })
    .nonnegative("Goal must be non-negative")
    .refine((value) => value !== undefined, {
      message: "Goal is required",
    }),
  shared_price: z
    .number({ invalid_type_error: "Shared price must be a number" })
    .nonnegative("shared price must be non-negative")
    .refine((value) => value !== undefined, {
      message: "Shared is required",
  }),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  files: z.array(z.string()).optional(),
});

type CreateFormValues = z.infer<typeof createRaiseCampaignFormSchema>;

// Initialize default values
const defaultValues: Partial<CreateFormValues> = {
  min_investment: 0, // Default to 0 or a reasonable value
  max_investment: 0,
  goal: 0,
  shared_price: 0,
  description: "",
  start_date: "",
  end_date: "",
  files: [],
};

export function CreateRaiseCampaignForm({ params }) {
  const router = useRouter();
  const id = params;  // Assuming you're passing `params` correctly
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createRaiseCampaignFormSchema),
    defaultValues: {
        min_investment: 0, // Default to 0 or a reasonable value
        max_investment: 0,
        goal: 0,
        shared_price: 0,
        description: "",
        start_date: new Date().toISOString().split('T')[0],
        end_date: "",
        files: [],
    }
  });
  const { errors } = form.formState;
  console.log("Create Raise Campaign form errors:", errors);

  async function onSubmit(data: CreateFormValues) {
    console.log("Create Raise Campaign form data:", data);
    try {
      const requestData = {
        business_id: id,
        min_investment: data.min_investment,
        max_investment: data.max_investment,
        raised: 0,
        shared_price: 0,
        goal: data.goal,
        description: data.description,
        start_date: data.start_date, 
        end_date: data.end_date,
        status: "open", 
        files: data.files || [],
      };
      console.log("Request data:", requestData);

      const response = await fetch(`/api/register/raiseCampaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = 'manage-raise-campaign';        
        toast.success("Raise campaign updated successfully");
      } if (result.message === "An open raise campaign already exists for this business." && result.status === 400) {
        toast.error("You already have an open raise campaign");
      } 
      else {
        toast.error("You already have an open raise campaign, please close it before creating a new one");
      }
    } catch (error) {
      toast.error("Failed to create raise campaign");
      console.error("Error creating raise campaign:", error);
    }
  }
  const editorDescription = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"], 
      }),
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        }}),
      Heading.configure({
        levels: [1],
        HTMLAttributes: {
          class: 'text-2xl',
        }
      }),
      
    ],
    content: "", // Set initial content from data
    editorProps: {
      attributes: {
        class: "text-md rounded-md border min-h-[300px] border-input bg-white my-2 py-2 px-3",
      },
      
    },
    onUpdate({ editor }) {
      // Update the form field value whenever the editor content changes
      form.setValue("description", editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col w-[85vw] items-center space-y-6 mb-16 mt-10 ">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold text-[#FF6347]">Create Raise Campaign</h1>
      </div>

      <div className="flex w-[80%] justify-center bg-white p-10 rounded shadow-md ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} // Make sure this is properly attached
            className="grid grid-cols-1 w-full md:grid-cols-2 gap-8"
          >
            {/* Minimum Investment */}
            <FormField
              control={form.control}
              name="min_investment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Investment</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Minimum investment for investors"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Maximum Investment */}
            <FormField
              control={form.control}
              name="max_investment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Investment</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Maximum investment for investors"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Goal */}
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Goal"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="shared_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shared Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Shared Price"
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

          {/* Start Date */}
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
                        defaultValue={new Date().toISOString().split('T')[0]} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            {/* End Date */}
            <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>End Date of your raise campaign</FormLabel>
                    <FormControl>
                        <Input
                        type="date"
                        {...field}
                        value={field.value || ""}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <div className="md:col-span-2 flex flex-col gap-1 justify-center">
                {/* Raise Campaign Description */}
                <div className="mt-2 ">
                  <p className="text-sm font-semibold mb-2">Raise Campaign Description</p>
                 <ToolsBar editor={editorDescription} id={id}/>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full">
                          <EditorContent editor={editorDescription} />
                        </div>
                      </FormControl>
                      <FormDescription>This will be displayed on the raise campaign page.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
    />
                </div>

            

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center">
              <Button type="submit" className="w-1/2">
                Create Raise Campaign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
