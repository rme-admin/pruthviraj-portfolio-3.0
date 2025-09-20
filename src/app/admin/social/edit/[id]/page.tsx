
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SocialForm from '../../social-form';
import { socialLinks } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditSocialLinkPage() {
    const params = useParams();
    const { id } = params;

    const socialLink = socialLinks.find((s) => s.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Social Link</CardTitle>
        <CardDescription>Update the details for your social media link.</CardDescription>
      </CardHeader>
      <CardContent>
        {socialLink ? (
            <SocialForm socialLink={socialLink} />
        ) : (
            <p>Social link not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
