'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Reference } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { Save } from 'lucide-react';

const referenceFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  designation: z.string().min(2, 'Designation is required.'),
  organization: z.string().min(2, 'Organization is required.'),
  relation: z.string().min(2, 'Relation is required.'),
  email: z.string().email('Please enter a valid email.').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type ReferenceFormValues = z.infer<typeof referenceFormSchema>;

interface ReferenceFormProps {
  reference?: Reference;
}

export default function ReferenceForm({ reference }: ReferenceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function onSubmit(data: ReferenceFormValues) {
    setIsSubmitting(true);
    setError(null);

    // Transform data for the API: fullName -> full_name
    const payload = {
      full_name: data.fullName,
      designation: data.designation,
      organization: data.organization,
      relation: data.relation,
      email: data.email,
      phone: data.phone,
    };

    try {
      if (reference) {
        await apiClient(`/api/admin/references/${reference.id}`, 'PUT', payload);
      } else {
        await apiClient('/api/admin/references', 'POST', payload);
      }
      router.push('/admin/references');
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
        <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="E.g., Dr. Emily Carter" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="designation" render={({ field }) => ( <FormItem> <FormLabel>Designation</FormLabel> <FormControl><Input placeholder="E.g., Professor of Computer Science" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="organization" render={({ field }) => ( <FormItem> <FormLabel>Organization</FormLabel> <FormControl><Input placeholder="E.g., University of Technology" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="relation" render={({ field }) => ( <FormItem> <FormLabel>Relation</FormLabel> <FormControl><Input placeholder="E.g., Thesis Advisor" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input type="email" placeholder="E.g., emily.carter@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input type="tel" placeholder="E.g., +1-123-456-7890" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Reference'}
        </Button>
      </form>
    </Form>
  );
}