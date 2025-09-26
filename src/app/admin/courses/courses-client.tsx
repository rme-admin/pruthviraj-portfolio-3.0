"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createCourseColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Certification } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface CoursesClientProps {
  initialCourses: Certification[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
  const [courses, setCourses] = useState<Certification[]>(initialCourses);

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await apiClient(`/api/admin/courses/${courseId}`, 'DELETE');
      setCourses(currentList => currentList.filter(c => c.id !== courseId));
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  const courseColumns = createCourseColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Courses & Certifications</CardTitle>
                <CardDescription>Manage your courses and certifications.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/courses/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Certification</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={courseColumns} data={courses} />
      </CardContent>
    </Card>
  );
}