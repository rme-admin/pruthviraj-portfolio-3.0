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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ImageCropper from '../my-info/image-cropper';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Save } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';

// 1. Zod schema updated to include all user-enterable fields from the database
const projectFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  location: z.string().min(2, 'Location is required.'),
  date: z.string().min(1, 'Date is required.'),
  live_link: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  category: z.enum(['Technical', 'Research'], {
    required_error: "You need to select a project category.",
  }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.img_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${project.img_url}` : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      location: project?.location || '',
      date: project?.date ? new Date(project.date).toISOString().split('T')[0] : '',
      live_link: project?.live_link || '',
      category: project?.category || 'Technical',
    },
  });

  const handleCropComplete = async (croppedImageString: string) => {
    setImagePreview(croppedImageString);
    try {
      const response = await fetch(croppedImageString);
      const blob = await response.blob();
      const file = new File([blob], `project_image_${Date.now()}.png`, { type: 'image/png' });
      setImageFile(file);
    } catch (e) {
      console.error("Error converting cropped image:", e);
    }
  };

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (project?.img_url) {
      formData.append('existingImageUrl', project.img_url);
    }

    try {
      if (project) {
        await apiClient(`/api/admin/projects/${project.id}`, 'PUT', formData);
      } else {
        await apiClient('/api/admin/projects', 'POST', formData);
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 2. Form now includes fields for all necessary database columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl><Input placeholder="E.g., E-commerce Platform" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl><Input placeholder="E.g., Personal Project" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="live_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL (Live Link)</FormLabel>
              <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your project in detail..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <FormLabel>Project Image</FormLabel>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-md">
              <AvatarImage src={imagePreview || undefined} alt="Project" className="rounded-md object-cover" />
              <AvatarFallback className="rounded-md"><ImageIcon /></AvatarFallback>
            </Avatar>
            <ImageCropper onCropComplete={handleCropComplete} aspect={16 / 9} />
          </div>
          <FormMessage />
        </FormItem>

        {error && <p className="text-sm text-destructive">{error}</p>}
        
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </Button>
      </form>
    </Form>
  );
}