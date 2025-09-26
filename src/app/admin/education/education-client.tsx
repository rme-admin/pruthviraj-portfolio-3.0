//education/education-client.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createEducationColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Education } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface EducationClientProps {
  initialEducation: Education[];
}

export default function EducationClient({ initialEducation }: EducationClientProps) {
  const [educationList, setEducationList] = useState<Education[]>(initialEducation);

  const handleDelete = async (educationId: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      await apiClient(`/api/admin/education/${educationId}`, 'DELETE');
      setEducationList(currentList => currentList.filter(e => e.id !== educationId));
    } catch (error) {
      console.error("Failed to delete education entry", error);
      // You can add a user-facing error toast here
    }
  };

  // Create columns dynamically, passing the delete handler
  const educationColumns = createEducationColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>Manage your education history.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/education/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Education</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={educationColumns} data={educationList} />
      </CardContent>
    </Card>
  );
}