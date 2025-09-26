"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, User as UserIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { apiClient } from '@/lib/api';
import ImageCropper from './image-cropper';

// Define a type for the data structure this component will manage
interface MyInfoData {
  prefix: string;
  first_name: string;
  last_name: string;
  profile_url: string | null;
  cv_url: string | null;
  cover_letter_url: string | null;
  about_me: string;
  email: string;
  phone_number: string;
  address: string;
}

// Define a type for the new files to be uploaded
interface MyInfoFiles {
  profile_image?: File;
  cv?: File;
  cover_letter?: File;
}

export const dynamic = 'force-dynamic';


export default function MyInfoPage() {
  // 1. State management for the component
  const [formData, setFormData] = useState<MyInfoData | null>(null);
  const [files, setFiles] = useState<MyInfoFiles>({});
  const [isLoading, setIsLoading] = useState(true); // Tracks initial data fetch
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 2. Fetch existing data when the component first loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient('/api/admin/my-info');
        setFormData(data);
        if (data.profile_url) {
          setImagePreview(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.profile_url}`);
        }
      } catch (err) {
        setError('Failed to load your information. Please refresh the page.');
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchData();
  }, []); // The empty dependency array [] ensures this runs only once on mount

  // 3. Handlers for form input changes
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string) => {
    if (!formData) return;
    setFormData({ ...formData, prefix: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };
  
  const handleCropComplete = async (croppedImageString: string) => {
    setImagePreview(croppedImageString);
    try {
      const response = await fetch(croppedImageString);
      const blob = await response.blob();
      const croppedFile = new File([blob], `profile_image_${Date.now()}.png`, { type: 'image/png' });
      setFiles({ ...files, profile_image: croppedFile });
    } catch (e) {
      console.error("Could not convert cropped image to file:", e);
      setError("There was an issue processing the cropped image.");
    }
  };

  // 4. Handler for the main form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) dataToSubmit.append(key, value);
    });
    Object.entries(files).forEach(([key, value]) => {
      if (value) dataToSubmit.append(key, value);
    });

    try {
      const result = await apiClient('/api/admin/my-info', 'PUT', dataToSubmit);
      setSuccess(result.message);
      const updatedData = await apiClient('/api/admin/my-info');
      setFormData(updatedData);
      setFiles({}); // Clear temporary files state after successful upload
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during the update.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 5. Render a loading state based only on the data fetching status
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!formData) {
    return <div className="flex h-screen items-center justify-center text-destructive">{error || "Could not load data."}</div>;
  }

  // 6. Render the form with all data and handlers connected
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-8 pt-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Details</h3>
            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-5">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="prefix">Prefix</Label>
                <Select name="prefix" value={formData.prefix} onValueChange={handleSelectChange}>
                  <SelectTrigger id="prefix"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr.">Mr.</SelectItem><SelectItem value="Ms.">Ms.</SelectItem><SelectItem value="Dr.">Dr.</SelectItem><SelectItem value="Prof.">Prof.</SelectItem><SelectItem value="Miss">Miss</SelectItem><SelectItem value="Mrs.">Mrs.</SelectItem><SelectItem value="Master">Master</SelectItem><SelectItem value="Sir">Sir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input name="first_name" id="first_name" value={formData.first_name} onChange={handleTextChange} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input name="last_name" id="last_name" value={formData.last_name} onChange={handleTextChange} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Assets</h3>
            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={imagePreview || undefined} alt="Profile" />
                    <AvatarFallback><UserIcon className="h-10 w-10" /></AvatarFallback>
                  </Avatar>
                  <ImageCropper onCropComplete={handleCropComplete} />
                </div>
                <p className="text-sm text-muted-foreground">Upload and crop your profile picture.</p>
                {formData.profile_url && <p className="text-sm text-muted-foreground">Current: {formData.profile_url}</p>}
              </div>
              <div />
              <div className="space-y-2">
                <Label htmlFor="cv">Upload CV</Label>
                <Input name="cv" id="cv" type="file" accept=".pdf" onChange={handleFileChange} />
                {formData.cv_url && <p className="text-sm text-muted-foreground">Current: {formData.cv_url}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_letter">Upload Cover Letter</Label>
                <Input name="cover_letter" id="cover_letter" type="file" accept=".pdf" onChange={handleFileChange} />
                {formData.cover_letter_url && <p className="text-sm text-muted-foreground">Current: {formData.cover_letter_url}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">About Section</h3>
            <div className="rounded-lg border p-4">
              <Label htmlFor="about_me">About Content</Label>
              <Textarea name="about_me" id="about_me" value={formData.about_me} onChange={handleTextChange} className="mt-2 min-h-[150px]" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" value={formData.email} onChange={handleTextChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone</Label>
                <Input name="phone_number" id="phone_number" type="tel" value={formData.phone_number} onChange={handleTextChange} />
              </div>
              <div className="col-span-full space-y-2">
                <Label htmlFor="address">Address / Location</Label>
                <Input name="address" id="address" value={formData.address} onChange={handleTextChange} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 border-t px-6 py-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-emerald-600">{success}</p>}
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}