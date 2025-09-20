
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AchievementForm from '../../achievement-form';
import { honorsAndAwards } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function EditAchievementPage() {
    const params = useParams();
    const { id } = params;

    const achievementEntry = honorsAndAwards.find((e) => e.id === id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Achievement</CardTitle>
        <CardDescription>Update the details for your honor or award.</CardDescription>
      </CardHeader>
      <CardContent>
        {achievementEntry ? (
            <AchievementForm achievement={achievementEntry} />
        ) : (
            <p>Achievement entry not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
