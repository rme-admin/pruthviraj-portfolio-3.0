
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { DataTable } from './data-table';
import { technicalProjectColumns, researchProjectColumns } from './columns';
import { projects, researchProjects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function ProjectsPage() {
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
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Project
                    </span>
                </Link>
            </Button>
        </div>
      </div>
      <TabsContent value="technical">
        <Card>
          <CardHeader>
            <CardTitle>Technical Projects</CardTitle>
            <CardDescription>
              Manage your technical projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={technicalProjectColumns} data={projects} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="research">
        <Card>
          <CardHeader>
            <CardTitle>Research Projects</CardTitle>
            <CardDescription>
              Manage your research projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={researchProjectColumns} data={researchProjects} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
