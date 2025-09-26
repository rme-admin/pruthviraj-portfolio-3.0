//courses/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CourseForm from '../../course-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Certification } from '@/lib/types';

export default function EditCoursePage() {
    useAuth(); // Client-side auth fallback
    const params = useParams();
    const { id } = params;

    const [certification, setCertification] = useState<Certification | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            try {
                const data = await apiClient(`/api/admin/courses/${id}`);
                // Transform data for the form
                const transformedData = {
                    id: data.id,
                    name: data.course_name,
                    issuer: data.issuer,
                    certificateFile: data.certificate_url,
                };
                setCertification(transformedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch certification details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Certification</CardTitle>
        <CardDescription>Update the details for your certification.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {certification && <CourseForm certification={certification} />}
      </CardContent>
    </Card>
  );
}