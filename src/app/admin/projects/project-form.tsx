
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
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import type { Project, ResearchProject } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projectFormSchema = z.object({
  type: z.enum(['technical', 'research']),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  date: z.string().min(1, 'Date is required.'),
  location: z.string().min(2, 'Location is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  url: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  image: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;
type projectUnion = Project | ResearchProject;

interface ProjectFormProps {
  project?: projectUnion;
}


export default function ProjectForm({ project }: ProjectFormProps) {
  const [projectImage, setProjectImage] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      type: project && 'url' in project ? 'technical' : 'research',
      title: project?.title || '',
      date: project?.date || '',
      location: project?.location || '',
      description: project?.description || '',
      url: project && 'url' in project ? project.url : '',
    },
  });

  useEffect(() => {
    if (project) {
        const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
        if (image) {
            setProjectImage(image.imageUrl);
        }
    }
  }, [project])

  const projectType = form.watch('type');

  function onSubmit(data: ProjectFormValues) {
    const fullData = { ...data, image: projectImage };
    console.log(fullData);
    // Here you would handle form submission, e.g., send to a server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="E.g., E-commerce Platform" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                    <Input placeholder="E.g., 05/2024" {...field} />
                </FormControl>
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
                <FormControl>
                    <Input placeholder="E.g., Personal Project" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        {projectType === 'technical' && (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project..."
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
              <FormLabel>Project Image</FormLabel>
              <div className="flex items-center gap-4">
                 <Avatar className="h-20 w-20 rounded-md">
                    <AvatarImage src={projectImage || undefined} alt="Project Image" className="rounded-md object-contain" />
                    <AvatarFallback className="rounded-md">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <ImageCropper onCropComplete={setProjectImage} aspect={3/2} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Project</Button>
      </form>
    </Form>
  );
}
