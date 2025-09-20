
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
import type { Publication } from '@/lib/data';

const publicationFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  authors: z.string().min(2, 'Authors must be at least 2 characters.'),
  venue: z.string().min(2, 'Venue is required.'),
  doi: z.string().min(2, 'DOI is required.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
});

type PublicationFormValues = z.infer<typeof publicationFormSchema>;

interface PublicationFormProps {
  publication?: Publication;
}

export default function PublicationForm({ publication }: PublicationFormProps) {
  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationFormSchema),
    defaultValues: {
      title: publication?.title || '',
      authors: publication?.authors || '',
      venue: publication?.venue || '',
      doi: publication?.doi || '',
      summary: publication?.summary || '',
    },
  });

  function onSubmit(data: PublicationFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="E.g., A Novel Approach to..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authors</FormLabel>
              <FormControl>
                <Input placeholder="E.g., J. Smith, A. Pruthviraj, L. Chen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                    <Input placeholder="E.g., Proceedings of Big Data Conf, 2021" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="doi"
            render={({ field }) => (
                <FormItem>
                <FormLabel>DOI</FormLabel>
                <FormControl>
                    <Input placeholder="E.g., 10.1234/bigdata.2021.67890" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a brief summary of the publication..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Publication</Button>
      </form>
    </Form>
  );
}
