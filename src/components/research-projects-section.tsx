import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { researchProjects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ResearchProjectsSection() {
    return (
        <section id="research-projects" className="py-20 md:py-32 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Research Projects</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        My research projects will be listed here.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {researchProjects.map((project, index) => {
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
                </div>
            </div>
        </section>
    );
}
