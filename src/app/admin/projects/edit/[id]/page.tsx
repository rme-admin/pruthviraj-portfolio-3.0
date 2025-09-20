
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProjectForm from '../../project-form';
import { projects, researchProjects } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
    const params = useParams();
    const { id } = params;

    const allProjects = [...projects, ...researchProjects];
    const project = allProjects.find((p) => p.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
        <CardDescription>Update the details for your project.</CardDescription>
      </CardHeader>
      <CardContent>
        {project ? (
            <ProjectForm project={project} />
        ) : (
            <p>Project not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
