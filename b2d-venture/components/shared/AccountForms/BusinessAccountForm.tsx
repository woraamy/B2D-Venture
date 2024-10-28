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

// Validation schema using zod
const businessFormSchema = z.object({
  profilePicture: z.any().optional(),
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
    .min(1, { message: "Please select at least one tag." })
    .optional(),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

const defaultValues: Partial<BusinessFormValues> = {
  tag_list: [],
};

export function BusinessAccountForm({ params }) {
  const id = params;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues,
  });

  const { toast } = useToast();

  // Handle profile picture upload and preview
  function handleProfilePictureChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

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

      if (response.ok) {
        toast({
          title: "Account updated successfully",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(result.business, null, 2)}</code>
            </pre>
          ),
        });
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
          <label className="font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-2"
          />
          <FormDescription>
            Please upload an image for your profile (optional).
          </FormDescription>
        </div>

        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Your first name" {...field} />
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
                <Input placeholder="Your last name" {...field} />
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
                <Input placeholder="Your contact number" {...field} />
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
                <Input placeholder="Tell us about your business" {...field} />
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
                <Input placeholder="Your business website" {...field} />
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
                <Input placeholder="Your business address" {...field} />
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
                <Input placeholder="City" {...field} />
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
                <Input placeholder="State or Province" {...field} />
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
                <Input placeholder="Postal Code" {...field} />
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
                <Input placeholder="Your country" {...field} />
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
                    <span className="text-red-500"> *</span>
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
