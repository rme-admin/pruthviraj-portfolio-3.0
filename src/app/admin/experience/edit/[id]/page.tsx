"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExperienceForm from '../../experience-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Experience } from '@/lib/types';

export default function EditExperiencePage() {
    useAuth();
    const params = useParams();
    const { id } = params;

    const [experience, setExperience] = useState<Experience | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchExperience = async () => {
            try {
                const data = await apiClient(`/api/admin/experience/${id}`);
                setExperience(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch experience details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperience();
    }, [id]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Experience</CardTitle>
                <CardDescription>Update the details for your work experience.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {experience && <ExperienceForm experience={experience} />}
            </CardContent>
        </Card>
    );
}