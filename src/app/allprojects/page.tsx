'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { getPortfolioData } from '@/lib/data';
import { Calendar, MapPin, Eye } from 'lucide-react';
import Header from './header';
import Footer from '@/components/layout/footer';
import ProjectDetails from './project-details';

type ProjectType = 'Technical' | 'Research';
type SelectedProject = Project & { type: ProjectType };

const PLACEHOLDER_IMAGE = '/placeholder-icon.png'; // Place this in your public folder

export const dynamic = 'force-dynamic';


export default function AllProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectType>('Research');
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getPortfolioData();
      if (data) {
        setProjects(data.projects || []);
        setCopyright(data.site_data?.copyright || '');
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (project: Project, type: ProjectType) => {
    setSelectedProject({ ...project, type });
  };
  
  const technicalProjects = projects.filter(p => p.category === 'Technical');
  const researchProjects = projects.filter(p => p.category === 'Research');
  const currentProjects = activeTab === 'Technical' ? technicalProjects : researchProjects;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold">All Projects</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            A complete collection of my technical and research work.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeTab === 'Research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('Research')}
          >
            Research Projects
          </Button>
          <Button
            variant={activeTab === 'Technical' ? 'default' : 'outline'}
            onClick={() => setActiveTab('Technical')}
          >
            Technical Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                {project.imageUrlId && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={
                        project.imageUrlId.startsWith('http')
                          ? project.imageUrlId
                          : `${API_BASE_URL}/${project.imageUrlId}`
                      }
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={() => handleViewDetails(project, activeTab)} variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
      <Footer copyright={copyright} />
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedProject(null);
            }
          }}
        />
      )}
    </div>
  );
}
