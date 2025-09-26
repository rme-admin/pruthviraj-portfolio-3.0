import Image from 'next/image';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import type { MediaItem } from '@/lib/types';

interface MediaSectionProps {
    media: MediaItem[];
}

export default function MediaSection({ media }: MediaSectionProps) {
    return (
        <section id="media" className="py-6 md:py-8 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Media</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        A collection of moments and memories.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(media || []).map((item) => (
                         <Card key={item.id} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                            {item.imageUrlId && (
                                <div className="aspect-video overflow-hidden">
                                    <Image
                                        src={item.imageUrlId}
                                        alt={item.caption}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardContent className="p-4 flex-grow">
                                 <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value={item.id} className="border-b-0">
                                        <AccordionTrigger className="p-0 hover:no-underline">
                                            <h3 className="font-semibold text-lg">{item.caption}</h3>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-0 text-muted-foreground">
                                           {item.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
