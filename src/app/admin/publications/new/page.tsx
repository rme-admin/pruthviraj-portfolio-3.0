
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PublicationForm from '../publication-form';

export default function NewPublicationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Publication</CardTitle>
        <CardDescription>Fill out the details for your new publication.</CardDescription>
      </CardHeader>
      <CardContent>
        <PublicationForm />
      </CardContent>
    </Card>
  );
}
