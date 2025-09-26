"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createSocialLinkColumns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { SocialLink } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface SocialLinksClientProps {
  initialLinks: SocialLink[];
}

export default function SocialLinksClient({ initialLinks }: SocialLinksClientProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialLinks);

  const handleDelete = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;

    try {
      await apiClient(`/api/admin/social-links/${linkId}`, 'DELETE');
      setSocialLinks(currentList => currentList.filter(l => l.id !== linkId));
    } catch (error) {
      console.error("Failed to delete social link", error);
    }
  };

  const socialLinkColumns = createSocialLinkColumns(handleDelete);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Manage your social media links.</CardDescription>
            </div>
            <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/admin/social/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Social Link</span>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={socialLinkColumns} data={socialLinks} />
      </CardContent>
    </Card>
  );
}