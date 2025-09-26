"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProjectForm from '../../project-form';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Project } from '@/lib/types'; // Using our central type definition

export default function EditProjectPage() {
    useAuth(); // Secure the page
    const params = useParams();
    const { id } = params;

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Don't fetch if the ID isn't available yet
        if (!id) return;

        const fetchProject = async () => {
            try {
                // Fetch the specific project data from our secure admin endpoint
                const data = await apiClient(`/api/admin/projects/${id}`);
                setProject(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch project details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]); // Re-run the effect if the id changes

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Project</CardTitle>
                <CardDescription>Update the details for your project.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p>Loading project...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {!isLoading && !error && project && (
                    <ProjectForm project={project} />
                )}
                {!isLoading && !error && !project && (
                    <p>Project not found.</p>
                )}
            </CardContent>
        </Card>
    );
}