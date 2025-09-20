
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Achievement } from '@/lib/data';

const achievementFormSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type AchievementFormValues = z.infer<typeof achievementFormSchema>;

interface AchievementFormProps {
  achievement?: Achievement;
}

export default function AchievementForm({ achievement }: AchievementFormProps) {
  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      description: achievement?.description || '',
    },
  });

  function onSubmit(data: AchievementFormValues) {
    console.log(data);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g., Innovatech Hackathon Winner - 2023"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Achievement</Button>
      </form>
    </Form>
  );
}
