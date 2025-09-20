
'use client';

import { useState } from 'react';
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
import { projects, researchProjects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import Header from './header';
import Footer from '@/components/layout/footer';

type ProjectType = 'technical' | 'research';

export default function AllProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectType>('research');

  const technicalProjects = projects;

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
            variant={activeTab === 'research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('research')}
          >
            Research Projects
          </Button>
          <Button
            variant={activeTab === 'technical' ? 'default' : 'outline'}
            onClick={() => setActiveTab('technical')}
          >
            Technical Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'research' && researchProjects.map((project, index) => {
            const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
            return (
              <Card key={index} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                {image && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
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
            );
          })}
          {activeTab === 'technical' && technicalProjects.map((project, index) => {
            const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
            return (
              <Card key={index} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                  {image && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                </Link>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
