"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PublicationForm from '../../publication-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Publication } from '@/lib/types';

export default function EditPublicationPage() {
    useAuth(); // Middleware handles redirection, but this can be a fallback
    const params = useParams();
    const { id } = params;

    const [publication, setPublication] = useState<Publication | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchPublication = async () => {
            try {
                const data = await apiClient(`/api/admin/publications/${id}`);
                setPublication(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch publication details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublication();
    }, [id]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Publication</CardTitle>
                <CardDescription>Update the details for your publication.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {publication && <PublicationForm publication={publication} />}
            </CardContent>
        </Card>
    );
}