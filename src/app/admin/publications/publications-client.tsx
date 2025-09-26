"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createPublicationColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Publication } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface PublicationsClientProps {
  initialPublications: Publication[];
}

export default function PublicationsClient({ initialPublications }: PublicationsClientProps) {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);

  const handleDelete = async (publicationId: string) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    try {
      await apiClient(`/api/admin/publications/${publicationId}`, 'DELETE');
      setPublications(currentList => currentList.filter(p => p.id !== publicationId));
    } catch (error) {
      console.error("Failed to delete publication", error);
      // You can add a user-facing error toast here
    }
  };

  const publicationColumns = createPublicationColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Publications</CardTitle>
                <CardDescription>Manage your publications.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/publications/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Publication</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={publicationColumns} data={publications} />
      </CardContent>
    </Card>
  );
}