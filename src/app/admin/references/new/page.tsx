
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ReferenceForm from '../reference-form';

export default function NewReferencePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Reference</CardTitle>
        <CardDescription>Fill out the details for your new professional reference.</CardDescription>
      </CardHeader>
      <CardContent>
        <ReferenceForm />
      </CardContent>
    </Card>
  );
}
