
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AchievementForm from '../achievement-form';

export default function NewAchievementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Achievement</CardTitle>
        <CardDescription>Fill out the details for your new honor or award.</CardDescription>
      </CardHeader>
      <CardContent>
        <AchievementForm />
      </CardContent>
    </Card>
  );
}
