"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '../projects/data-table';
import { createEnquiryColumns } from './columns';
import type { Enquiry } from '@/lib/types';
import { apiClient } from '@/lib/api';

interface EnquiriesClientProps {
  initialEnquiries: Enquiry[];
}

export default function EnquiriesClient({ initialEnquiries }: EnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);

  // --- NEW: Handler to change the status ---
  const handleChangeStatus = async (enquiryId: string, newStatus: Enquiry['status']) => {
    try {
      // Call the dedicated API endpoint to update the status
      await apiClient(`/api/admin/enquiries/${enquiryId}/status`, 'PUT', { status: newStatus });
      // Update the local state to instantly reflect the change in the UI
      setEnquiries(currentList => 
        currentList.map(enq => 
          enq.id === enquiryId ? { ...enq, status: newStatus } : enq
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      // You can add a user-facing error toast here
    }
  };

  // --- NEW: Handler to delete an enquiry ---
  const handleDelete = async (enquiryId: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await apiClient(`/api/admin/enquiries/${enquiryId}`, 'DELETE');
      setEnquiries(currentList => currentList.filter(e => e.id !== enquiryId));
    } catch (error) {
      console.error("Failed to delete enquiry", error);
    }
  };

  // Pass both handlers to the column creation function
  const enquiryColumns = createEnquiryColumns(handleChangeStatus, handleDelete);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enquiries</CardTitle>
        <CardDescription>
          View and manage messages submitted through your contact form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={enquiryColumns} data={enquiries} />
      </CardContent>
    </Card>
  );
}