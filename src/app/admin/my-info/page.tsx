
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export default function MyInfoPage() {
  return (
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Details</h3>
            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="prefix">Prefix</Label>
                  <Input id="prefix" placeholder="Mr. / Mrs. / Dr." defaultValue="John" />
                </div>
                 <div />
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                </div>
            </div>
          </div>
           <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Assets</h3>
             <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <Input id="profileImage" type="file" />
                    <p className="text-sm text-muted-foreground">Upload a new profile picture. (e.g., .png, .jpg)</p>
                </div>
                <div />
                <div className="space-y-2">
                    <Label htmlFor="cv">Upload CV</Label>
                    <Input id="cv" type="file" />
                     <p className="text-sm text-muted-foreground">Upload your latest CV. (e.g., .pdf)</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="coverLetter">Upload Cover Letter</Label>
                    <Input id="coverLetter" type="file" />
                     <p className="text-sm text-muted-foreground">Upload your cover letter. (e.g., .pdf)</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">About Section</h3>
            <div className="rounded-lg border p-4">
              <Label htmlFor="aboutContent">About Content</Label>
              <Textarea
                id="aboutContent"
                placeholder="Write a short bio about yourself..."
                className="mt-2 min-h-[150px]"
                defaultValue="A passionate Senior Software Engineer transforming complex problems into elegant, user-centric solutions. I have a strong background in both research and technical projects, with a Master's in Physics providing a unique analytical perspective to my software development work."
              />
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-medium">Contact Information</h3>
             <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="hello@portfoliopilot.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1-123-456-7890" defaultValue="+1 (234) 567-890" />
                </div>
                 <div className="col-span-full space-y-2">
                    <Label htmlFor="address">Address / Location</Label>
                    <Input id="address" placeholder="City, Country" defaultValue="San Francisco, CA" />
                </div>
             </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
        </CardFooter>
      </Card>
  );
}
