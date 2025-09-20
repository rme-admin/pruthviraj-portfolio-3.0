import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { education } from '@/lib/data';

export default function EducationSection() {
    return (
        <section id="education" className="py-20 md:py-32 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Education</h2>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            {education.map((edu, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <div className="text-left">
                                            <p className="font-semibold">{edu.degree}</p>
                                            <p className="text-sm text-muted-foreground">{edu.institution} | {edu.period}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {edu.description}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
