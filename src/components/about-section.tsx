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
import { projects, researchProjects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, ChevronsLeftRight } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
                </div>

                <div className="space-y-12">
                    <div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                            A passionate Senior Software Engineer transforming complex problems into elegant, user-centric solutions. I have a strong background in both research and technical projects, with a Master's in Physics providing a unique analytical perspective to my software development work.
                        </p>
                    </div>

                    <div id="projects" className="scroll-mt-20">
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-8 font-headline">Technical Projects</h3>
                            <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
                                <CarouselContent>
                                    {projects.map((project, index) => {
                                        const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
                                        return (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1 h-full">
                                                    <Card className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 h-full">
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
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
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
                                    {researchProjects.map((project, index) => {
                                        const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
                                        return (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1 h-full">
                                                    <Card key={index} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 h-full">
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
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
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

                </div>
            </div>
        </section>
    );
}
