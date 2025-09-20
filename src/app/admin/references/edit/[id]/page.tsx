
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ReferenceForm from '../../reference-form';
import { references } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditReferencePage() {
    const params = useParams();
    const { id } = params;

    const referenceEntry = references.find((r) => r.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Reference</CardTitle>
        <CardDescription>Update the details for your professional reference.</CardDescription>
      </CardHeader>
      <CardContent>
        {referenceEntry ? (
            <ReferenceForm reference={referenceEntry} />
        ) : (
            <p>Reference entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
