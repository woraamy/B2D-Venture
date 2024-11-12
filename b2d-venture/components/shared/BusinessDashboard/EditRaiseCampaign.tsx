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
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import ToolsBar from "../ToolsBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";


// Schema for form validation
const editRaiseCampaignFormSchema = z.object({
  min_investment: z
    .number({ invalid_type_error: "Minimum investment must be a number" })
    .nonnegative("Minimum investment must be non-negative")
    .optional(),
  max_investment: z
    .number({ invalid_type_error: "Maximum investment must be a number" })
    .nonnegative("Maximum investment must be non-negative")
    .optional(),
  goal: z
    .number({ invalid_type_error: "Goal must be a number" })
    .nonnegative("Goal must be non-negative")
    .optional(),
  shared_price: z
    .number({ invalid_type_error: "shared price must be a number" })
    .nonnegative("shared price must be non-negative")
    .optional(),
  description: z.string().optional(), // Optional description
  investment_benefit: z.string().optional(), // New field for investment benefit
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  files: z.array(z.string()).optional(),
});

type EditFormValues = z.infer<typeof editRaiseCampaignFormSchema>;

// Default values
const defaultValues: Partial<EditFormValues> = {};

export function EditRaiseCampaignForm({ params, data }) {
  const id = params;
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editRaiseCampaignFormSchema),
    defaultValues,
  });

  async function onSubmit(data: EditFormValues) {
    try {
      const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, data, role: "raisecampaign" }),
      });

      const result = await response.json();

      if (result.message === "Raise campaign updated successfully") {
        toast.success("Raise campaign updated successfully");
      } else {
        console.log(result);
        toast.error("Failed to update raise campaign because result is not ok");
      }
    } catch (error) {
      toast.error("Failed to update raise campaign");
      console.error("Error updating raise campaign:", error);
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"], 
      }),
      Image
    ],
    content: data.description || "", // Set initial content from data
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
        <h1 className="text-2xl font-bold text-[#FF6347]">Edit Raise Campaign</h1>
      </div>
      

        {/* Form Container */}
        <div className="flex w-[80%] justify-center bg-white p-10 rounded shadow-md ">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="grid grid-cols-1 w-full md:grid-cols-2 gap-8">
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
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        defaultValue={data.min_investment || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

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
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        defaultValue={data.max_investment || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

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
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        defaultValue={data.goal || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

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
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        defaultValue={data.shared_price || ""} />
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
                        defaultValue={data.start_date ? data.start_date.slice(0, 10) : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

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
                        defaultValue={data.end_date ? data.end_date.slice(0, 10) : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <div className="md:col-span-2 flex flex-col gap-1 justify-center">
              {/* Investment Benefit */}
              <FormField
                control={form.control}
                name="investment_benefit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Benefit</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Describe the benefits for investors"
                        {...field}
                        defaultValue={data.investment_benefit || ""}
                        className="w-full h-32 p-3 border rounded" />
                    </FormControl>
                    <FormDescription>This will help investors understand the benefits.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Raise Campaign Description */}
                <div className="mt-10 ">
                  <p className="text-sm font-semibold mb-2">Raise Campaign Description</p>
                 <ToolsBar editor={editor}/>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full">
                          <EditorContent editor={editor} />
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
                  Update Raise Campaign
                </Button>
            </div>
              
            </form>
          </Form>
        </div>
      </div>
  )};