
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
import type { Education } from '@/lib/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const educationFormSchema = z.object({
  degree: z.string().min(2, 'Degree must be at least 2 characters.'),
  institution: z.string().min(2, 'Institution must be at least 2 characters.'),
  period: z.string().min(2, 'Period is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  marksType: z.enum(['cgpa', 'percentage']).optional(),
  marksScored: z.string().optional(),
  marksOutOf: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationFormSchema>;

interface EducationFormProps {
  education?: Education;
}

export default function EducationForm({ education }: EducationFormProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      degree: education?.degree || '',
      institution: education?.institution || '',
      period: education?.period || '',
      description: education?.description || '',
      marksType: education?.marksType,
      marksScored: education?.marksScored || '',
      marksOutOf: education?.marksOutOf || '',
    },
  });

  const marksType = form.watch('marksType');

  function onSubmit(data: EducationFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="E.g., M.S. in Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="E.g., University of Technology" {...field} />
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
                    <Input placeholder="E.g., 2018 - 2020" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="marksType"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Marks Type</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="cgpa" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            CGPA
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="percentage" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            Percentage
                            </FormLabel>
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
                    name="marksScored"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Marks Scored</FormLabel>
                        <FormControl>
                            <Input placeholder="E.g., 8.5 or 85" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 {marksType === 'cgpa' && (
                    <FormField
                        control={form.control}
                        name="marksOutOf"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Out Of</FormLabel>
                            <FormControl>
                                <Input placeholder="E.g., 10" {...field} />
                            </FormControl>
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
                <Textarea
                  placeholder="Describe your course of study..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Education</Button>
      </form>
    </Form>
  );
}
