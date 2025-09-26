'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Certification } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { Save } from 'lucide-react';

const courseFormSchema = z.object({
  name: z.string().min(2, 'Course name must be at least 2 characters.'),
  issuer: z.string().min(2, 'Issuer must be at least 2 characters.'),
  certificateFile: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormProps {
  certification?: Certification;
}

export default function CourseForm({ certification }: CourseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: certification?.name || '',
      issuer: certification?.issuer || '',
      certificateFile: certification?.certificateFile || '',
    },
  });

  async function onSubmit(data: CourseFormValues) {
    setIsSubmitting(true);
    setError(null);

    // Transform data for the API: name -> course_name, etc.
    const payload = {
        course_name: data.name,
        issuer: data.issuer,
        certificate_url: data.certificateFile
    };

    try {
      if (certification) {
        await apiClient(`/api/admin/courses/${certification.id}`, 'PUT', payload);
      } else {
        await apiClient('/api/admin/courses', 'POST', payload);
      }
      router.push('/admin/courses');
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
        <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Course Name</FormLabel> <FormControl><Input placeholder="E.g., Certified Kubernetes Application Developer" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="issuer" render={({ field }) => ( <FormItem> <FormLabel>Issuer</FormLabel> <FormControl><Input placeholder="E.g., The Linux Foundation" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="certificateFile" render={({ field }) => ( <FormItem> <FormLabel>Certificate URL</FormLabel> <FormControl><Input type="url" placeholder="https://example.com/certificate/123" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Certification'}
        </Button>
      </form>
    </Form>
  );
}