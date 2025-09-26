'use client';

import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { SocialLink } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link2, Save } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';

const socialFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  url: z.string().url('Please enter a valid URL.'),
});

type SocialFormValues = z.infer<typeof socialFormSchema>;

interface SocialFormProps {
  socialLink?: SocialLink;
}

export default function SocialForm({ socialLink }: SocialFormProps) {
  const router = useRouter();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(socialLink?.icon || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      name: socialLink?.name || '',
      url: socialLink?.url || '',
    },
  });

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data: SocialFormValues) {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('url', data.url);
    if (iconFile) {
      formData.append('icon', iconFile);
    } else if (socialLink?.icon) {
      const relativePath = new URL(socialLink.icon).pathname.substring(1);
      formData.append('existingIconUrl', relativePath);
    }

    try {
      if (socialLink) {
        await apiClient(`/api/admin/social-links/${socialLink.id}`, 'PUT', formData);
      } else {
        await apiClient('/api/admin/social-links', 'POST', formData);
      }
      router.push('/admin/social');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Name</FormLabel> <FormControl><Input placeholder="E.g., LinkedIn" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="url" render={({ field }) => ( <FormItem> <FormLabel>URL</FormLabel> <FormControl><Input placeholder="https://linkedin.com/in/your-profile" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <FormItem>
          <FormLabel>Icon</FormLabel>
            <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage src={iconPreview || undefined} alt="Icon preview" />
                <AvatarFallback className="rounded-full"><Link2 className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <FormControl>
                <Input type="file" accept="image/png, image/svg+xml" onChange={handleIconChange} className="max-w-xs" />
            </FormControl>
            </div>
          <FormMessage />
        </FormItem>

        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Social Link'}
        </Button>
      </form>
    </Form>
  );
}