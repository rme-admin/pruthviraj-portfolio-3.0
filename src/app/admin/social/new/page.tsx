
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SocialForm from '../social-form';

export default function NewSocialLinkPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Social Link</CardTitle>
        <CardDescription>Fill out the details for your new social media link.</CardDescription>
      </CardHeader>
      <CardContent>
        <SocialForm />
      </CardContent>
    </Card>
  );
}
