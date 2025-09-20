
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExperienceForm from '../experience-form';

export default function NewExperiencePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Experience</CardTitle>
        <CardDescription>Fill out the details for your new work experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <ExperienceForm />
      </CardContent>
    </Card>
  );
}
