
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MediaForm from '../media-form';

export default function NewMediaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Media</CardTitle>
        <CardDescription>Fill out the details for your new media item.</CardDescription>
      </CardHeader>
      <CardContent>
        <MediaForm />
      </CardContent>
    </Card>
  );
}
