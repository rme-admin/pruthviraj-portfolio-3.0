'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SocialForm from '../../social-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { SocialLink } from '@/lib/types';

export default function EditSocialLinkPage() {
    useAuth();
    const params = useParams();
    const { id } = params;

    const [socialLink, setSocialLink] = useState<SocialLink | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchLink = async () => {
            try {
                const data = await apiClient(`/api/admin/social-links/${id}`);
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const transformedData = {
                    id: data.id,
                    name: data.name,
                    url: data.url,
                    icon: data.icon_url ? `${API_BASE_URL}/${data.icon_url}` : '',
                };
                setSocialLink(transformedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch social link details.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLink();
    }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Social Link</CardTitle>
        <CardDescription>Update the details for your social media link.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {socialLink && <SocialForm socialLink={socialLink} />}
      </CardContent>
    </Card>
  );
}