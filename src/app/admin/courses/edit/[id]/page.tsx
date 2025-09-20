
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CourseForm from '../../course-form';
import { certifications } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditCoursePage() {
    const params = useParams();
    const { id } = params;

    const certificationEntry = certifications.find((c) => c.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Certification</CardTitle>
        <CardDescription>Update the details for your certification.</CardDescription>
      </CardHeader>
      <CardContent>
        {certificationEntry ? (
            <CourseForm certification={certificationEntry} />
        ) : (
            <p>Certification entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
