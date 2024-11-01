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
import RaiseCampaign from "@/models/RaiseCampaign";

// Validation schema for raise campaign using zod
const raiseFormSchema = z.object({
  main_investment: z
    .number()
    .positive({ message: "Main investment must be a positive number." })
    .nonnegative({ message: "Main investment must be a valid number." }),
  max_investment: z
    .number()
    .positive({ message: "Max investment must be a positive number." })
    .nonnegative({ message: "Max investment must be a valid number." }),
  goal: z
    .number()
    .positive({ message: "Goal must be a positive number." })
    .nonnegative({ message: "Goal must be a valid number." }),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Start date must be in YYYY-MM-DD format." }),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "End date must be in YYYY-MM-DD format." }),
});

type RaiseCampaignFormValues = z.infer<typeof raiseFormSchema>;

export async function EditRaiseCampaignForm({ params }) {
  const id = params;
  const data = await RaiseCampaign.find({ business_id: id }).populate("business_id").lean();

  const form = useForm<RaiseCampaignFormValues>({
    resolver: zodResolver(raiseFormSchema),
    defaultValues: {
      main_investment: data.main_investment || 0,
      max_investment: data.max_investment || 0,
      goal: data.goal || 0,
      start_date: data.start_date || "",
      end_date: data.end_date || "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: RaiseCampaignFormValues) {
    try {
      // API call to update raise campaign details
      const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, data, role: "raisecampaign" }), // Send campaign id, form data, and role
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Campaign updated successfully",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(result.campaign, null, 2)}</code>
            </pre>
          ),
        });

        window.location.reload();
      } else {
        toast({
          title: "Update failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating the campaign.",
        variant: "destructive",
      });
      console.error("Error updating raise campaign:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Main Investment */}
        <FormField
          control={form.control}
          name="main_investment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Investment</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter main investment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Max Investment */}
        <FormField
          control={form.control}
          name="max_investment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Investment</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter max investment" {...field} />
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
                <Input type="number" placeholder="Enter campaign goal" {...field} />
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
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Raise Campaign</Button>
      </form>
    </Form>
  );
}
