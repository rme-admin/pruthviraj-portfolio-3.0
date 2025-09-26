'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AchievementForm from '../../achievement-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Achievement } from '@/lib/types';

export const dynamic = 'force-dynamic';


export default function EditAchievementPage() {
    useAuth(); // Middleware handles security, but this is a good client-side fallback
    const params = useParams();
    const { id } = params;

    const [achievement, setAchievement] = useState<Achievement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchAchievement = async () => {
            try {
                const data = await apiClient(`/api/admin/achievements/${id}`);
                // Transform the data: map 'achievement' from API to 'description' for the form
                const transformedData = { id: data.id, description: data.achievement };
                setAchievement(transformedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch achievement details.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAchievement();
    }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Achievement</CardTitle>
        <CardDescription>Update the details for your honor or award.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {achievement && <AchievementForm achievement={achievement} />}
      </CardContent>
    </Card>
  );
}