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
import { InvestChart } from "@/components/charts/investchart";

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
  investment_benefit: z.string().min(1, "Investment benefit is required"),
  end_date: z.string().min(1, "End date is required"),
  files: z.array(z.string()).optional(),
});

type CreateFormValues = z.infer<typeof createRaiseCampaignFormSchema>;

// Initialize default values
const defaultValues: Partial<CreateFormValues> = {
  min_investment: 0, // Default to 0 or a reasonable value
  max_investment: 0,
  goal: 0,
  description: "",
  investment_benefit: "",
  end_date: "",
  files: [],
};

export function CreateRaiseCampaignForm({ params }) {
  const id = params;  // Assuming you're passing `params` correctly
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createRaiseCampaignFormSchema),
    defaultValues: {
        min_investment: 0, // Default to 0 or a reasonable value
        max_investment: 0,
        goal: 0,
        description: "",
        investment_benefit: "",
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
        investment_benefit: data.investment_benefit,
        start_date: Date.now(), 
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

  return (
    <div className="flex flex-col items-center space-y-6 w-[50vw] mt-10 mx-56">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold text-[#FF6347]">Create Raise Campaign</h1>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} // Make sure this is properly attached
            className="space-y-8"
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

            {/* Raise Campaign Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raise campaign Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Tell us about your raise campaign"
                      {...field}
                      value={field.value || ""}
                      className="w-full h-32 p-3 border rounded"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on the raise campaign page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Raise Campaign Description */}
            <FormField
              control={form.control}
              name="investment_benefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raise campaign Benefits for Investor</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Tell us about your raise campaign's benefits"
                      {...field}
                      value={field.value || ""}
                      className="w-full h-32 p-3 border rounded"
                    />
                  </FormControl>
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
