
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { courseColumns } from './columns';
import { certifications } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function CoursesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Courses & Certifications</CardTitle>
                <CardDescription>
                Manage your courses and certifications.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/courses/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Certification
                    </span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={courseColumns} data={certifications} />
      </CardContent>
    </Card>
  );
}
