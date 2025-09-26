'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Achievement } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { Save } from 'lucide-react';

const achievementFormSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type AchievementFormValues = z.infer<typeof achievementFormSchema>;

interface AchievementFormProps {
  achievement?: Achievement;
}

export default function AchievementForm({ achievement }: AchievementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      description: achievement?.description || '',
    },
  });

  async function onSubmit(data: AchievementFormValues) {
    setIsSubmitting(true);
    setError(null);

    // Transform the data back to match the API's expected 'achievement' field
    const payload = {
      achievement: data.description,
    };

    try {
      if (achievement) {
        await apiClient(`/api/admin/achievements/${achievement.id}`, 'PUT', payload);
      } else {
        await apiClient('/api/admin/achievements', 'POST', payload);
      }
      router.push('/admin/achievements');
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
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Achievement'}
        </Button>
      </form>
    </Form>
  );
}