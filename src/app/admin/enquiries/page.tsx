
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { enquiryColumns } from './columns';
import { enquiries } from '@/lib/data';

export default function EnquiriesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enquiries</CardTitle>
        <CardDescription>
          View messages submitted through your contact form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={enquiryColumns} data={enquiries} />
      </CardContent>
    </Card>
  );
}
