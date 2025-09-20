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
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight } from 'lucide-react';

export default function TechnicalProjectsSection() {
  return (
    <section id="technical-projects" className="py-20 md:py-32 bg-card scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Technical Projects</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            A selection of projects that showcase my skills and passion for development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
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
      </div>
    </section>
  );
}
