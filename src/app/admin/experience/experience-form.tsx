//experience/experience-form.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Experience } from '@/lib/types';
import { Save } from 'lucide-react';

const experienceFormSchema = z.object({
  role: z.string().min(2, 'Role must be at least 2 characters.'),
  company: z.string().min(2, 'Company must be at least 2 characters.'),
  period: z.string().min(2, 'Period is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

interface ExperienceFormProps {
  experience?: Experience;
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      role: experience?.role || '',
      company: experience?.company || '',
      period: experience?.period || '',
      description: experience?.description || '',
    },
  });

  async function onSubmit(data: ExperienceFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (experience) {
        // Update existing entry
        await apiClient(`/api/admin/experience/${experience.id}`, 'PUT', data);
      } else {
        // Create new entry
        await apiClient('/api/admin/experience', 'POST', data);
      }
      router.push('/admin/experience');
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl><Input placeholder="E.g., Senior Software Engineer" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl><Input placeholder="E.g., Innovatech Solutions" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl><Input placeholder="E.g., 2022 - Present" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Describe your responsibilities..." className="min-h-[150px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Experience'}
        </Button>
      </form>
    </Form>
  );
}