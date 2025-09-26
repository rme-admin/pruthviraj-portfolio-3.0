"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createReferenceColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Reference } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface ReferencesClientProps {
  initialReferences: Reference[];
}

// This line is critical. It must be a default export.
export default function ReferencesClient({ initialReferences }: ReferencesClientProps) {
  const [references, setReferences] = useState<Reference[]>(initialReferences);

  const handleDelete = async (referenceId: string) => {
    if (!confirm('Are you sure you want to delete this reference?')) return;
    try {
      await apiClient(`/api/admin/references/${referenceId}`, 'DELETE');
      setReferences(currentList => currentList.filter(r => r.id !== referenceId));
    } catch (error) {
      console.error("Failed to delete reference", error);
    }
  };

  const referenceColumns = createReferenceColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>References</CardTitle>
                <CardDescription>Manage your professional references.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/references/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Reference</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={referenceColumns} data={references} />
      </CardContent>
    </Card>
  );
}