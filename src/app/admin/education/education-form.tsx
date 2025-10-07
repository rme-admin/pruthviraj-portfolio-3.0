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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Education } from '@/lib/types';
import { Save } from 'lucide-react';

// Schema matches the API and database structure
const educationFormSchema = z.object({
  course: z.string().min(2, 'Course/Degree must be at least 2 characters.'),
  institute: z.string().min(2, 'Institution must be at least 2 characters.'),
  period: z.string().min(2, 'Period is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  entry_type: z.enum(['cgpa', 'percentage', 'Undergraduate', 'Postgraduate']).optional(),
  mark_obtained: z.string().optional(),
  max_mark: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationFormSchema>;

interface EducationFormProps {
  education?: Education;
}

export default function EducationForm({ education }: EducationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      course: education?.degree || '',
      institute: education?.institution || '',
      period: education?.period || '',
      description: education?.description || '',
      entry_type: education?.marksType,
      mark_obtained: education?.marksScored || '',
      max_mark: education?.marksOutOf || '',
    },
  });

  const marksType = form.watch('entry_type');

  async function onSubmit(data: EducationFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (education) {
        await apiClient(`/api/admin/education/${education.id}`, 'PUT', data);
      } else {
        await apiClient('/api/admin/education', 'POST', data);
      }
      router.push('/admin/education');
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree / Course</FormLabel>
              <FormControl><Input placeholder="E.g., M.S. in Computer Science" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl><Input placeholder="E.g., University of Technology" {...field} /></FormControl>
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
              <FormControl><Input placeholder="E.g., 2018 - 2020" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="entry_type"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Marks/Entry Type</FormLabel>
                    <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="cgpa" /></FormControl>
                            <FormLabel className="font-normal">CGPA</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="percentage" /></FormControl>
                            <FormLabel className="font-normal">Percentage</FormLabel>
                          </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="mark_obtained"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Marks Scored</FormLabel>
                        <FormControl><Input placeholder="E.g., 8.5 or 85" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 {marksType === 'cgpa' && (
                    <FormField
                        control={form.control}
                        name="max_mark"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Out Of</FormLabel>
                            <FormControl><Input placeholder="E.g., 10" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                 )}
            </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your course of study..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {error && <p className="text-destructive">{error}</p>}
        
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Education'}
        </Button>
      </form>
    </Form>
  );
}