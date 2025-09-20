
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PublicationForm from '../../publication-form';
import { publications } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditPublicationPage() {
    const params = useParams();
    const { id } = params;

    const publicationEntry = publications.find((p) => p.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Publication</CardTitle>
        <CardDescription>Update the details for your publication.</CardDescription>
      </CardHeader>
      <CardContent>
        {publicationEntry ? (
            <PublicationForm publication={publicationEntry} />
        ) : (
            <p>Publication entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
