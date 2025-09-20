
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
import ImageCropper from '../my-info/image-cropper';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import type { MediaItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mediaFormSchema = z.object({
  caption: z.string().min(2, 'Caption must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  image: z.string().optional(),
});

type MediaFormValues = z.infer<typeof mediaFormSchema>;

interface MediaFormProps {
  mediaItem?: MediaItem;
}

export default function MediaForm({ mediaItem }: MediaFormProps) {
  const [mediaImage, setMediaImage] = useState<string | null>(null);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      caption: mediaItem?.caption || '',
      description: mediaItem?.description || '',
    },
  });

  useEffect(() => {
    if (mediaItem) {
        const image = PlaceHolderImages.find(p => p.id === mediaItem.imageUrlId);
        if (image) {
            setMediaImage(image.imageUrl);
        }
    }
  }, [mediaItem])

  function onSubmit(data: MediaFormValues) {
    const fullData = { ...data, image: mediaImage };
    console.log(fullData);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Conference Talk" {...field} />
              </FormControl>
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
                <Textarea
                  placeholder="Describe the media item..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Media Image</FormLabel>
              <div className="flex items-center gap-4">
                 <Avatar className="h-20 w-20 rounded-md">
                    <AvatarImage src={mediaImage || undefined} alt="Media Image" className="rounded-md object-contain" />
                    <AvatarFallback className="rounded-md">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <ImageCropper onCropComplete={setMediaImage} aspect={3/2} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Media Item</Button>
      </form>
    </Form>
  );
}
