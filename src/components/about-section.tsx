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
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { skills, education, experiences, researchProjects, certifications, honorsAndAwards, publications } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        A glimpse into my professional journey, skills, and accomplishments.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Research Projects</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {researchProjects.map((project, index) => {
                                    const image = PlaceHolderImages.find(p => p.id === project.imageUrlId);
                                    return (
                                        <div key={index} className="flex flex-col sm:flex-row gap-4 items-center">
                                            {image && <Image src={image.imageUrl} alt={image.description} width={150} height={100} className="rounded-md object-cover flex-shrink-0" data-ai-hint={image.imageHint} />}
                                            <div>
                                                <h4 className="font-semibold">{project.title}</h4>
                                                <p className="text-muted-foreground text-sm">{project.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-sm flex items-center gap-1.5 py-1 px-2">
                                        <skill.icon className="h-4 w-4" />
                                        {skill.name}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Honors & Awards</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {honorsAndAwards.map((award, i) => <li key={i}>{award}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Publications</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {publications.map((pub, i) => <li key={i}>{pub}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
