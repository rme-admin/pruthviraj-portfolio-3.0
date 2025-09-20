
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { experienceColumns } from './columns';
import { experiences } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Experience</CardTitle>
                <CardDescription>
                Manage your work experience.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/experience/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Experience
                    </span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={experienceColumns} data={experiences} />
      </CardContent>
    </Card>
  );
}
