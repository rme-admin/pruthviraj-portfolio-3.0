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
import type { Publication } from '@/lib/types';
import { Save } from 'lucide-react';

// Schema matches the API and database structure
const publicationFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  author: z.string().min(2, 'Authors must be at least 2 characters.'), // Changed to 'author'
  venue: z.string().min(2, 'Venue is required.'),
  doi: z.string().min(2, 'DOI is required.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
});

type PublicationFormValues = z.infer<typeof publicationFormSchema>;

interface PublicationFormProps {
  publication?: Publication;
}

export default function PublicationForm({ publication }: PublicationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationFormSchema),
    defaultValues: {
      title: publication?.title || '',
      author: publication?.authors || '',
      venue: publication?.venue || '',
      doi: publication?.doi || '',
      summary: publication?.summary || '',
    },
  });

  async function onSubmit(data: PublicationFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (publication) {
        // Update existing entry
        await apiClient(`/api/admin/publications/${publication.id}`, 'PUT', data);
      } else {
        // Create new entry
        await apiClient('/api/admin/publications', 'POST', data);
      }
      router.push('/admin/publications');
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
        <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input placeholder="E.g., A Novel Approach to..." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="author" render={({ field }) => ( <FormItem> <FormLabel>Authors</FormLabel> <FormControl><Input placeholder="E.g., J. Smith, A. Pruthviraj, L. Chen" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="venue" render={({ field }) => ( <FormItem> <FormLabel>Venue</FormLabel> <FormControl><Input placeholder="E.g., Proceedings of Big Data Conf, 2021" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="doi" render={({ field }) => ( <FormItem> <FormLabel>DOI</FormLabel> <FormControl><Input placeholder="E.g., 10.1234/bigdata.2021.67890" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="summary" render={({ field }) => ( <FormItem> <FormLabel>Summary</FormLabel> <FormControl><Textarea placeholder="Provide a brief summary..." className="min-h-[150px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Publication'}
        </Button>
      </form>
    </Form>
  );
}