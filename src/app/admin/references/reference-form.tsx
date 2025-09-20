
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
import type { Reference } from '@/lib/data';

const referenceFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  designation: z.string().min(2, 'Designation must be at least 2 characters.'),
  organization: z.string().min(2, 'Organization must be at least 2 characters.'),
  relation: z.string().min(2, 'Relation must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
});

type ReferenceFormValues = z.infer<typeof referenceFormSchema>;

interface ReferenceFormProps {
  reference?: Reference;
}

export default function ReferenceForm({ reference }: ReferenceFormProps) {
  const form = useForm<ReferenceFormValues>({
    resolver: zodResolver(referenceFormSchema),
    defaultValues: {
      fullName: reference?.fullName || '',
      designation: reference?.designation || '',
      organization: reference?.organization || '',
      relation: reference?.relation || '',
      email: reference?.email || '',
      phone: reference?.phone || '',
    },
  });

  function onSubmit(data: ReferenceFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Dr. Emily Carter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Professor of Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input placeholder="E.g., University of Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relation</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Thesis Advisor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="E.g., emily.carter@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input type="tel" placeholder="E.g., +1-123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <Button type="submit">Save Reference</Button>
      </form>
    </Form>
  );
}
