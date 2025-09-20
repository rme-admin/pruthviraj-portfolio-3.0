
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EducationForm from '../../education-form';
import { education } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditEducationPage() {
    const params = useParams();
    const { id } = params;

    const educationEntry = education.find((e) => e.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Education</CardTitle>
        <CardDescription>Update the details for your education entry.</CardDescription>
      </CardHeader>
      <CardContent>
        {educationEntry ? (
            <EducationForm education={educationEntry} />
        ) : (
            <p>Education entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
