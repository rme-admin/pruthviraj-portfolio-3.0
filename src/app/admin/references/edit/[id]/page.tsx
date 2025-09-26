'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReferenceForm from '../../reference-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Reference } from '@/lib/types';

export default function EditReferencePage() {
    useAuth(); // Client-side auth fallback
    const params = useParams();
    const { id } = params;

    const [reference, setReference] = useState<Reference | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchReference = async () => {
            try {
                const data = await apiClient(`/api/admin/references/${id}`);
                // Transform data for the form
                const transformedData = {
                    id: data.id,
                    fullName: data.full_name,
                    designation: data.designation,
                    organization: data.organization,
                    relation: data.relation,
                    email: data.email,
                    phone: data.phone,
                };
                setReference(transformedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch reference details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReference();
    }, [id]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Reference</CardTitle>
                <CardDescription>Update the details for your professional reference.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {reference && <ReferenceForm reference={reference} />}
            </CardContent>
        </Card>
    );
}