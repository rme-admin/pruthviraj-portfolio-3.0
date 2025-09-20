
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
import type { Certification } from '@/lib/data';

const courseFormSchema = z.object({
  name: z.string().min(2, 'Course name must be at least 2 characters.'),
  issuer: z.string().min(2, 'Issuer must be at least 2 characters.'),
  certificateFile: z.any().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormProps {
  certification?: Certification;
}

export default function CourseForm({ certification }: CourseFormProps) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: certification?.name || '',
      issuer: certification?.issuer || '',
    },
  });

  function onSubmit(data: CourseFormValues) {
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
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Certified Kubernetes Application Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issuer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input placeholder="E.g., The Linux Foundation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="certificateFile"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Certificate File</FormLabel>
                <FormControl>
                    <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Save Certification</Button>
      </form>
    </Form>
  );
}
