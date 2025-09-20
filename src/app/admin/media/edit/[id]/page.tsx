
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MediaForm from '../../media-form';
import { media } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditMediaPage() {
    const params = useParams();
    const { id } = params;

    const mediaItem = media.find((p) => p.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Media</CardTitle>
        <CardDescription>Update the details for your media item.</CardDescription>
      </CardHeader>
      <CardContent>
        {mediaItem ? (
            <MediaForm mediaItem={mediaItem} />
        ) : (
            <p>Media item not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
