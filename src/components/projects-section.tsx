// src/components/projects-section.tsx

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { projects, researchProjects } from '@/lib/data';
import { getPortfolioData } from '@/lib/data'; 
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types'; 

interface ProjectsSectionProps {
  technicalProjects: Project[];
  researchProjects: Project[];
}

export default function ProjectsSection({ technicalProjects, researchProjects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Projects</h2>
        </div>
        
        {/* Technical Projects Section */}
        <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 font-headline">Technical Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map over the 'technicalProjects' prop */}
            {(technicalProjects || []).map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                    {/* The entire card is not a link, only specific elements are */}
                    {project.imageUrlId && (
                        <div className="aspect-video overflow-hidden">
                        <Image
                            src={project.imageUrlId} // Use the live image URL
                            alt={project.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        {project.live_link && (
                            <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={project.live_link} target="_blank" rel="noopener noreferrer">
                                    View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>

        {/* Research Projects Section */}
        <div>
            <h3 className="text-3xl font-bold text-center mb-8 font-headline">Research Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Map over the 'researchProjects' prop */}
                {(researchProjects || []).map((project) => (
                    <Card key={project.id} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                        {project.imageUrlId && (
                            <div className="aspect-video overflow-hidden">
                            <Image
                                src={project.imageUrlId} 
                                alt={project.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>{project.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}