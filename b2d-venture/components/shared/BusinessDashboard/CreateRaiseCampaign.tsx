"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  files: z.array(z.string()).optional(),
});

type CreateFormValues = z.infer<typeof createRaiseCampaignFormSchema>;

// Default values
const defaultValues: Partial<CreateFormValues> = {};


export function CreateRaiseCampaignForm({ params }) {
    const id = params;
    const form = useForm<CreateFormValues>({
      resolver: zodResolver(createRaiseCampaignFormSchema),
      defaultValues,
    });
    const { toast } = useToast();
  
    async function onSubmit(data: CreateFormValues) {
      try {
        const response = await fetch(`/api/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, data, role: "raisecampaign" }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          toast({
            title: "Raise campaign created successfully",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(result.investor, null, 2)}
                </code>
              </pre>
            ),
          });
        } else {
          toast({
            title: "Creation failed",
            description: result.error,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Creation failed",
          description: "An error occurred while creating your campaign.",
          variant: "destructive",
        });
        console.error("Error creating raise campaign:", error);
      }
    }
  
    return (
      <div className="flex flex-col items-center space-y-8 w-[80vw] mt-10">
        <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
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
                      />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Raise Campaign Description */}
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
                      />
                    </FormControl>
                    <FormDescription>This will be displayed on raise campaign page.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Raise Campaign
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }