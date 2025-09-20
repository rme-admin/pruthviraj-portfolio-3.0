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
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { ArrowUpRight, ChevronsLeftRight, Calendar, MapPin } from 'lucide-react';

interface AboutSectionProps {
    userDetails: any;
    technicalProjects: Project[];
    researchProjects: Project[];
}

export default function AboutSection({ userDetails, technicalProjects, researchProjects }: AboutSectionProps) {
    const { about_me } = userDetails || {};
    
    return (
        <section id="about" className="py-6 md:py-8 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
                </div>

                <div className="space-y-12">
                    <div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                            {about_me}
                        </p>
                    </div>

                    <div id="projects" className="scroll-mt-20">
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-8 font-headline">Technical Projects</h3>
                            <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
                                <CarouselContent>
                                    {(technicalProjects || []).map((project, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1 h-full">
                                                <Card className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 h-full">
                                                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
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
                                                    </Link>
                                                    <CardHeader>
                                                        <CardTitle>{project.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex-grow">
                                                        <CardDescription>{project.description}</CardDescription>
                                                         <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{project.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>{project.location}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter>
                                                        <Button asChild variant="link" className="p-0 h-auto">
                                                            <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                                                View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <div className="text-center mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                                <ChevronsLeftRight className="h-4 w-4" />
                                <span>swipe right to left</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-center mb-8 font-headline">Research Projects</h3>
                             <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
                                <CarouselContent>
                                    {(researchProjects || []).map((project, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1 h-full">
                                                <Card key={index} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 h-full">
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
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{project.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>{project.location}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <div className="text-center mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                                <ChevronsLeftRight className="h-4 w-4" />
                                <span>swipe right to left</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button asChild>
                            <Link href="/allprojects">
                                View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
