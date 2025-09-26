'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MediaForm from '../../media-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { MediaItem } from '@/lib/types';

export default function EditMediaPage() {
    useAuth();
    const params = useParams();
    const { id } = params;

    const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMediaItem = async () => {
            try {
                const data = await apiClient(`/api/admin/media/${id}`);
                // Transform data for the form
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const transformedData = {
                    id: data.id,
                    caption: data.caption,
                    description: data.description,
                    imageUrlId: data.img_url ? `${API_BASE_URL}/${data.img_url}` : '',
                };
                setMediaItem(transformedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch media details.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMediaItem();
    }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Media</CardTitle>
        <CardDescription>Update the details for your media item.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {mediaItem && <MediaForm mediaItem={mediaItem} />}
      </CardContent>
    </Card>
  );
}