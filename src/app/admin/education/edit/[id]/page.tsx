//education/edit/[id]/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EducationForm from '../../education-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Education } from '@/lib/types';

export default function EditEducationPage() {
    useAuth();
    const params = useParams();
    const { id } = params;

    const [education, setEducation] = useState<Education | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEducation = async () => {
            try {
                const data = await apiClient(`/api/admin/education/${id}`);
                setEducation(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch education details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEducation();
    }, [id]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Education</CardTitle>
                <CardDescription>Update the details for your education entry.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {education && <EducationForm education={education} />}
            </CardContent>
        </Card>
    );
}