import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MyInfoPage() {
  return (
      <Card>
        <CardHeader>
          <CardTitle>My Info</CardTitle>
          <CardDescription>
            Edit your personal information here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This page will contain forms to edit your prefix, name, profile image, CV, cover letter, about content, and contact information.
          </p>
        </CardContent>
      </Card>
  );
}
