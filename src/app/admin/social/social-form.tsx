
'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SocialLink } from '@/lib/data';
import { socialIcons } from '@/lib/social-icons.tsx';

const socialFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  url: z.string().url('Please enter a valid URL.'),
  icon: z.string().min(1, 'Please select an icon.'),
});

type SocialFormValues = z.infer<typeof socialFormSchema>;

interface SocialFormProps {
  socialLink?: SocialLink;
}

export default function SocialForm({ socialLink }: SocialFormProps) {
  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      name: socialLink?.name || '',
      url: socialLink?.url || '',
      icon: socialLink?.icon || '',
    },
  });

  function onSubmit(data: SocialFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., LinkedIn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/your-profile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(socialIcons).map((iconName) => (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center gap-2">
                        {React.createElement(socialIcons[iconName], { className: "h-5 w-5" })}
                        <span>{iconName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Social Link</Button>
      </form>
    </Form>
  );
}

    