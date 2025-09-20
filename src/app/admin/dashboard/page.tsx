
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to your Admin Dashboard!</CardTitle>
          <CardDescription>
            This is your central hub for managing all the content on your portfolio website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You can use the navigation on the left to edit different sections of your site.
            From here, you can update your projects, manage your skills, and keep your contact information current.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
