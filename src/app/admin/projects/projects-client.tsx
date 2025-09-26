"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from './data-table';
import { createColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Project } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await apiClient(`/api/admin/projects/${projectId}`, 'DELETE');
      // On success, filter out the deleted project from the local state
      setProjects(currentProjects => currentProjects.filter(p => p.id !== projectId));
      // Optionally, show a success toast
    } catch (error) {
      console.error("Failed to delete project", error);
      // Optionally, show an error toast
    }
  };

  // We create the columns dynamically, passing the delete handler
  const columns = createColumns(handleDeleteProject);

  const technicalProjects = projects.filter(p => p.category === 'Technical');
  const researchProjects = projects.filter(p => p.category === 'Research');

  return (
    <Tabs defaultValue="technical">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="technical">Technical Projects</TabsTrigger>
          <TabsTrigger value="research">Research Projects</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/projects/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Project</span>
                </Link>
            </Button>
        </div>
      </div>
      <TabsContent value="technical">
        <Card>
          <CardHeader>
            <CardTitle>Technical Projects</CardTitle>
            <CardDescription>Manage your technical projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={technicalProjects} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="research">
        <Card>
          <CardHeader>
            <CardTitle>Research Projects</CardTitle>
            <CardDescription>Manage your research projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={researchProjects} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}