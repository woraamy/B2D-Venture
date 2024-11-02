"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { set } from "mongoose";

// Validation schema for raise campaign using zod
const raiseFormSchema = z.object({
  main_investment: z
    .number()
    .positive({ message: "Min investment must be a positive number." })
    .nonnegative({ message: "Min investment must be a valid number." }),
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

export function EditRaiseCampaignForm({params, data}) {
  const id = params;
  console.log("Data in client side" + data)
  console.log(data)
  const [initialData, setInitialData] = useState({
    min_investment: 0,
    max_investment: 0,
    goal: 0,
    start_date: "",
    end_date: "",
  });
  const [campaignData, setCampaignData] = useState<any | null>(null);
  const { toast } = useToast();

  // Fetch data in useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/fetchingData/RaiseCampaign/businessId/${id}`);
        const result = await response.json();
        const campaignData = result[0];

        if (response.ok && campaignData) {
          setInitialData({
            min_investment: campaignData.min_investment,
            max_investment: campaignData.max_investment,
            goal: campaignData.goal,
            start_date: campaignData.start_date,
            end_date: campaignData.end_date,
          });
          setCampaignData(campaignData);
          console.log(initialData)
        } else {
          toast({
            title: "Error",
            description: "Failed to load campaign data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching campaign data.",
          variant: "destructive",
        });
      }
    }

    fetchData();
  }, [id, toast]);

  // Initialize form using react-hook-form
  const form = useForm<RaiseCampaignFormValues>({
    resolver: zodResolver(raiseFormSchema),
    defaultValues: initialData || {
      main_investment: 0,
      max_investment: 0,
      goal: 0,
      start_date: "",
      end_date: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: RaiseCampaignFormValues) {
    try {
      const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, data, role: "raisecampaign" }),
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

  if (!initialData) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
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
              <FormLabel>Min Investment</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter min investment" 
                  {...field}
                  defaultValue={data.min_investment} 
                  />
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
                <Input 
                  type="number" 
                  placeholder="Enter max investment" 
                  {...field} 
                  defaultValue={data.max_investment}/>
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
                  placeholder="Enter campaign goal" 
                  {...field} 
                  defaultValue={data.goal}/>
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
                <Input 
                  type="date" 
                  {...field} 
                  defaultValue={data.start_date}/>
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
              <Input 
                  type="date" 
                  {...field} 
                  defaultValue={data.end_date}/>
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
