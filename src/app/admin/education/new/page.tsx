
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EducationForm from '../education-form';

export default function NewEducationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Education</CardTitle>
        <CardDescription>Fill out the details for your new education entry.</CardDescription>
      </CardHeader>
      <CardContent>
        <EducationForm />
      </CardContent>
    </Card>
  );
}
