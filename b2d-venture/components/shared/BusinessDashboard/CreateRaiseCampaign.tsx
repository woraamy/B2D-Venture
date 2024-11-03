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