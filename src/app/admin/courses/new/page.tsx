
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CourseForm from '../course-form';

export default function NewCoursePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Certification</CardTitle>
        <CardDescription>Fill out the details for your new course or certification.</CardDescription>
      </CardHeader>
      <CardContent>
        <CourseForm />
      </CardContent>
    </Card>
  );
}
