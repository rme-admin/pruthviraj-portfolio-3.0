"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createExperienceColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Experience } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface ExperienceClientProps {
  initialExperience: Experience[];
}

export default function ExperienceClient({ initialExperience }: ExperienceClientProps) {
  const [experienceList, setExperienceList] = useState<Experience[]>(initialExperience);

  const handleDelete = async (experienceId: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;

    try {
      await apiClient(`/api/admin/experience/${experienceId}`, 'DELETE');
      setExperienceList(currentList => currentList.filter(e => e.id !== experienceId));
      // Optionally, show a success toast
    } catch (error) {
      console.error("Failed to delete experience entry", error);
      // Optionally, show an error toast
    }
  };

  // Create columns dynamically, passing the delete handler
  const experienceColumns = createExperienceColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Experience</CardTitle>
                <CardDescription>Manage your work experience.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/experience/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Experience</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={experienceColumns} data={experienceList} />
      </CardContent>
    </Card>
  );
}