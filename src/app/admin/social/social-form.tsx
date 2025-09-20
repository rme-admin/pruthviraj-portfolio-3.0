
'use client';

import React, { useState, useEffect } from 'react';
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
import type { SocialLink } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link2 } from 'lucide-react';

const socialFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  url: z.string().url('Please enter a valid URL.'),
  icon: z.any().optional(),
});

type SocialFormValues = z.infer<typeof socialFormSchema>;

interface SocialFormProps {
  socialLink?: SocialLink;
}

export default function SocialForm({ socialLink }: SocialFormProps) {
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      name: socialLink?.name || '',
      url: socialLink?.url || '',
      icon: socialLink?.icon || '',
    },
  });

  useEffect(() => {
    if (socialLink?.icon) {
      setIconPreview(socialLink.icon);
    }
  }, [socialLink]);

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
        form.setValue('icon', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

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
          render={() => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
               <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={iconPreview || undefined} alt="Icon preview" />
                  <AvatarFallback className="rounded-full">
                    <Link2 className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <FormControl>
                    <Input
                        type="file"
                        accept="image/png, image/svg+xml"
                        onChange={handleIconChange}
                        className="max-w-xs"
                    />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Social Link</Button>
      </form>
    </Form>
  );
}
