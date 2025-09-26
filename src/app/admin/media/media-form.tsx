'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ImageCropper from '../my-info/image-cropper';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Save } from 'lucide-react';
import type { MediaItem } from '@/lib/types';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';

const mediaFormSchema = z.object({
  caption: z.string().min(2, 'Caption must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type MediaFormValues = z.infer<typeof mediaFormSchema>;

interface MediaFormProps {
  mediaItem?: MediaItem;
}

export default function MediaForm({ mediaItem }: MediaFormProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(mediaItem?.imageUrlId || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      caption: mediaItem?.caption || '',
      description: mediaItem?.description || '',
    },
  });

  const handleCropComplete = async (croppedImageString: string) => {
    setImagePreview(croppedImageString);
    try {
      const response = await fetch(croppedImageString);
      const blob = await response.blob();
      const file = new File([blob], `media_image_${Date.now()}.png`, { type: 'image/png' });
      setImageFile(file);
    } catch (e) {
      console.error(e);
    }
  };

  async function onSubmit(data: MediaFormValues) {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('description', data.description);
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (mediaItem?.imageUrlId) {
      // Extract the relative path from the full URL to send back
      const relativePath = new URL(mediaItem.imageUrlId).pathname.substring(1);
      formData.append('existingImageUrl', relativePath);
    }

    try {
      if (mediaItem) {
        await apiClient(`/api/admin/media/${mediaItem.id}`, 'PUT', formData);
      } else {
        await apiClient('/api/admin/media', 'POST', formData);
      }
      router.push('/admin/media');
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
        <FormField control={form.control} name="caption" render={({ field }) => ( <FormItem> <FormLabel>Caption</FormLabel> <FormControl><Input placeholder="E.g., Conference Talk" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="Describe the media item..." className="min-h-[150px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <FormItem>
          <FormLabel>Media Image</FormLabel>
          <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 rounded-md">
                <AvatarImage src={imagePreview || undefined} alt="Media" className="rounded-md object-cover" />
                <AvatarFallback className="rounded-md"><ImageIcon /></AvatarFallback>
              </Avatar>
              <ImageCropper onCropComplete={handleCropComplete} aspect={16 / 9} />
          </div>
          <FormMessage />
        </FormItem>
        
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Media Item'}
        </Button>
      </form>
    </Form>
  );
}