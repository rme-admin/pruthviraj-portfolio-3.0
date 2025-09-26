"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createMediaColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { MediaItem } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface MediaClientProps {
  initialMedia: MediaItem[];
}

export default function MediaClient({ initialMedia }: MediaClientProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      await apiClient(`/api/admin/media/${mediaId}`, 'DELETE');
      setMedia(currentList => currentList.filter(m => m.id !== mediaId));
    } catch (error) {
      console.error("Failed to delete media item", error);
    }
  };

  const mediaColumns = createMediaColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Media</CardTitle>
                <CardDescription>Manage your media gallery.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/media/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Media</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={mediaColumns} data={media} />
      </CardContent>
    </Card>
  );
}