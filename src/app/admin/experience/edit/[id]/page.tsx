
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExperienceForm from '../../experience-form';
import { experiences } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditExperiencePage() {
    const params = useParams();
    const { id } = params;

    const experienceEntry = experiences.find((e) => e.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Experience</CardTitle>
        <CardDescription>Update the details for your work experience.</CardDescription>
      </CardHeader>
      <CardContent>
        {experienceEntry ? (
            <ExperienceForm experience={experienceEntry} />
        ) : (
            <p>Experience entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
