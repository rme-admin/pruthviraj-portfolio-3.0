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
import { experiences } from '@/lib/data';

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-20 md:py-32 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Experience</h2>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {experiences.map((exp, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <div className="text-left">
                                            <p className="font-semibold">{exp.role}</p>
                                            <p className="text-sm text-muted-foreground">{exp.company} | {exp.period}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {exp.description}
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
