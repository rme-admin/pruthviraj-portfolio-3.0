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
import { education, experiences } from '@/lib/data';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
                </div>

                <div className="space-y-12">
                    <div>
                        <h3 className="text-3xl font-bold text-center mb-8 font-headline">Personal Statement</h3>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                            A passionate Senior Software Engineer transforming complex problems into elegant, user-centric solutions. I have a strong background in both research and technical projects, with a Master's in Physics providing a unique analytical perspective to my software development work.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible>
                                {education.map((edu, index) => (
                                    <AccordionItem value={`edu-item-${index}`} key={`edu-${index}`}>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {experiences.map((exp, index) => (
                                    <AccordionItem value={`exp-item-${index}`} key={`exp-${index}`}>
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
            </div>
        </section>
    );
}