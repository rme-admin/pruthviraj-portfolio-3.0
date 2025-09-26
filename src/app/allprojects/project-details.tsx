
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

type SelectedProject = Project & { type: 'Technical' | 'Research' };

interface ProjectDetailsProps {
  project: SelectedProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetails({ project, open, onOpenChange }: ProjectDetailsProps) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-headline text-3xl mb-4">{project.title}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6">
          {project.imageUrlId && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={project.imageUrlId}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
              </div>
          </div>

          <SheetDescription>{project.description}</SheetDescription>

          {project.type === 'Technical' && project.url && (
            <Button asChild className="w-full">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                View Live Project
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
