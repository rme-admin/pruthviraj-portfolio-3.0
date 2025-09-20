import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { publications } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function PublicationsSection() {
    return (
        <section id="publications" className="py-10 md:py-16 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Publications</h2>
                </div>
                <div className="space-y-8">
                    {publications.map((pub, index) => (
                        <Card key={index}>
                            <CardHeader className="p-4 pb-0">
                                <CardTitle>{pub.title}</CardTitle>
                                <CardDescription className="space-y-1">
                                    <p><span className="font-semibold">Authors:</span> {pub.authors}</p>
                                    <p><span className="font-semibold">Venue:</span> {pub.venue}</p>
                                    <p>
                                        <span className="font-semibold">DOI:</span>{' '}
                                        <Link href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            {pub.doi} <ArrowUpRight className="inline-block h-4 w-4" />
                                        </Link>
                                    </p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0 px-4 pb-4">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="pt-0">Details</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold">Summary:</h4>
                                                    <p className="text-muted-foreground">{pub.summary}</p>
                                                </div>
                                            </div>
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
