//skills/page.tsx

"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DataTable } from '../projects/data-table'; 
import { createSkillColumns } from './columns';
import { PlusCircle, Save } from 'lucide-react';
import { apiClient } from '@/lib/api';
import type { Skill } from '@/lib/types';

const skillFormSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters.'),
  category: z.enum(['Technical', 'Research', 'Hobby']),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillsClientProps {
    initialSkills: Skill[];
}

export default function SkillsClient({ initialSkills }: SkillsClientProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: { name: '', category: 'Technical' },
  });

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    form.reset({ name: skill.name, category: skill.category });
  };
  
  const cancelEdit = () => {
    setEditingSkill(null);
    form.reset({ name: '', category: 'Technical' });
  };

  const handleDelete = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
        await apiClient(`/api/admin/skills/${skillId}`, 'DELETE');
        setSkills(current => current.filter(s => s.id !== skillId));
    } catch (err) {
        // handle error
    }
  };

  const skillColumns = createSkillColumns(handleEdit, handleDelete);

  async function onSubmit(data: SkillFormValues) {
    setIsSubmitting(true);
    setError(null);
    // Transform data for the API: name -> skill_name
    const payload = {
        skill_name: data.name,
        category: data.category,
    };

    try {
        if (editingSkill) {
            // Update existing skill
            const updatedSkill = await apiClient(`/api/admin/skills/${editingSkill.id}`, 'PUT', payload);
            setSkills(current => current.map(s => s.id === editingSkill.id ? { ...s, name: data.name, category: data.category } : s));
        } else {
            // Create new skill
            const newSkill = await apiClient('/api/admin/skills', 'POST', payload);
            // To get the full object back, the API should return the created item
            // For now, we'll optimistically update the UI
            const newSkillForUI = { ...newSkill, name: data.name, category: data.category, id: `temp-${Date.now()}` };
            setSkills(current => [newSkillForUI, ...current]);
        }
        cancelEdit(); // Reset form
    } catch (err: any) {
        setError(err.message || "An error occurred");
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
          <CardDescription>{editingSkill ? `Update the details for "${editingSkill.name}".` : 'Add a new skill to your portfolio.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-4">
              <div className="sm:col-span-2"><FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input placeholder="E.g., React" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
              <div><FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Technical">Technical</SelectItem><SelectItem value="Research">Research</SelectItem><SelectItem value="Hobby">Hobby</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} /></div>
              <div className="flex items-end gap-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {editingSkill ? <><Save className="mr-2 h-4 w-4"/> Update</> : <><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</>}
                </Button>
                {editingSkill && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
              </div>
            </form>
          </Form>
          {error && <p className="text-sm text-destructive mt-4">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Skills</CardTitle>
          <CardDescription>Manage your existing skills.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={skillColumns} data={skills} />
        </CardContent>
      </Card>
    </div>
  );
}