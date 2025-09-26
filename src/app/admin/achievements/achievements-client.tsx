"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createAchievementColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Achievement } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface AchievementsClientProps {
  initialAchievements: Achievement[];
}

export default function AchievementsClient({ initialAchievements }: AchievementsClientProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  const handleDelete = async (achievementId: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      await apiClient(`/api/admin/achievements/${achievementId}`, 'DELETE');
      setAchievements(currentList => currentList.filter(a => a.id !== achievementId));
    } catch (error) {
      console.error("Failed to delete achievement", error);
    }
  };

  const achievementColumns = createAchievementColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Manage your honors and awards.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/achievements/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Achievement</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={achievementColumns} data={achievements} />
      </CardContent>
    </Card>
  );
}