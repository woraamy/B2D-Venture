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
import { Checkbox } from "@/components/ui/checkbox";
import Business from "@/models/Business";
import UploadBusinessProfile from "../BusinessDashboard/UploadBusinessProfile";

// Validation schema using zod
const businessFormSchema = z.object({
  profilePicture: z.any().optional(),
  BusinessName: z
    .string()
    .max(160, {
      message: "business name must not exceed 160 characters.",
    }).optional(),
  firstName: z
    .string()
    .max(160, {
      message: "First name must not exceed 160 characters.",
    })
    .optional(),
  lastName: z
    .string()
    .max(160, {
      message: "Last name must not exceed 160 characters.",
    })
    .optional(),
  contactNumber: z
    .string()
    .max(15, {
      message: "Contact number must not exceed 15 characters.",
    })
    .optional(),
  description: z.string().max(160).optional(),
  website: z.string().url().optional(),
  BusinessAddress: z.string().max(160).optional(),
  city: z.string().max(160).optional(),
  stateProvince: z.string().max(160).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().max(20).optional(),
  tag_list: z
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
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

const defaultValues: Partial<BusinessFormValues> = {
  tag_list: [],
};

export function BusinessAccountForm({ params, data }) {
  const id = params;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues,
  });

  const { toast } = useToast();

  async function onSubmit(data: BusinessFormValues) {
    try {
      // API call to update business details
      const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, data, role: "business" }), // Send businessId, form data, and role
      });
  
      const result = await response.json();
      console.log(result);
      
      if (response.ok) {
        console.log("Account updated successfully");
        toast({
          title: "Account updated successfully",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(result.business, null, 2)}</code>
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
        description: "An error occurred while updating your account.",
        variant: "destructive",
      });
      console.error("Error updating business account:", error);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col">
          {data.profile ? (
            <img
              src={data.profile}
              alt="Profile preview"
              className="w-52 h-52 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-52 h-52 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <label className="font-medium text-gray-700">Profile Picture</label>
          < UploadBusinessProfile business_id={id}/>
          <FormDescription>
            Please upload an image for your profile (optional).
          </FormDescription>
        </div>

        {/* Business Name */}
        <FormField
          control={form.control}
          name="BusinessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your Business name" 
                  {...field}
                  defaultValue={data.BusinessName || ""}
                   />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your first name" 
                  {...field}
                  defaultValue={data.firstName || ""}
                   />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your last name" 
                  {...field}
                  defaultValue={data.lastName || ""} 
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your contact number" 
                  {...field}
                  defaultValue={data.contactNumber || ""} />
              </FormControl>
              <FormDescription>
                Optional, but useful if we need to reach you directly.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tell us about your business" 
                  {...field}
                  defaultValue={data.description || ""} />
              </FormControl>
              <FormDescription>This will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input 
                placeholder="Your business website" 
                {...field}
                defaultValue={data.website || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Address */}
        <FormField
          control={form.control}
          name="BusinessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Input 
                placeholder="Your business address" 
                {...field}
                defaultValue={data.BusinessAddress || ""}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input 
                laceholder="City" 
                {...field}
                defaultValue={data.city || ""}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State/Province */}
        <FormField
          control={form.control}
          name="stateProvince"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Input 
                  placeholder="State or Province" 
                  {...field}
                  defaultValue={data.stateProvince || ""}
                   />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Postal Code */}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Postal Code" 
                  {...field}
                  defaultValue={data.postalCode || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your country" 
                  {...field}
                  defaultValue={data.country || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type of Business*/}
        <FormField
            control={form.control}
            name="tag_list"
            render={({ field }) => (
                <FormItem>
                <FormLabel>
                    Business Type Tags
                </FormLabel>
                <FormControl>
                    <div>
                    {[
                        "Aerospace",
                        "Food & Drinks",
                        "Shop",
                        "Technology",
                        "Innovation",
                        "Transportation",
                        "Energy",
                        "AI & Machine Learning",
                    ].map((tag) => (
                        <label key={tag} className="ml-4">
                        <input
                            type="checkbox"
                            value={tag}
                            checked={field.value.includes(tag)}
                            onChange={(e) => {
                            const value = e.target.value;
                            if (field.value.includes(value)) {
                                field.onChange(field.value.filter((val: string) => val !== value));
                            } else {
                                field.onChange([...field.value, value]);
                            }
                            }}
                        />{" "}
                        {tag}
                        </label>
                    ))}
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

        <Button type="submit">Update Business Account</Button>
      </form>
    </Form>
  );
}
