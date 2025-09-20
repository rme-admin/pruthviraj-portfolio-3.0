
'use client';

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
import { Textarea } from '@/components/ui/textarea';
import type { Experience } from '@/lib/data';

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
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      role: experience?.role || '',
      company: experience?.company || '',
      period: experience?.period || '',
      description: experience?.description || '',
    },
  });

  function onSubmit(data: ExperienceFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
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
              <FormControl>
                <Input placeholder="E.g., Senior Software Engineer" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="E.g., Innovatech Solutions" {...field} />
              </FormControl>
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
                <FormControl>
                    <Input placeholder="E.g., 2022 - Present" {...field} />
                </FormControl>
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
              <FormControl>
                <Textarea
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Experience</Button>
      </form>
    </Form>
  );
}
