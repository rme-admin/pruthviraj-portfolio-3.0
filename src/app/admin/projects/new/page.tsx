
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProjectForm from '../project-form';

export default function NewProjectPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>Fill out the details for your new project.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm />
      </CardContent>
    </Card>
  );
}
