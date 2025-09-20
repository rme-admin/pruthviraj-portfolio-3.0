import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/data';

export default function EducationSection() {
    return (
        <section id="education" className="bg-background scroll-mt-20 py-6 md:py-8">
            <div className="container mx-auto px-4 md:px-6 pt-4">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Education</h2>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>
                    {education.map((edu, index) => (
                        <div key={index} className="relative mb-8">
                            <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                    <div className="bg-card p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                                        <p className="text-muted-foreground">{edu.institution}</p>
                                        <p className="text-sm text-primary font-semibold mt-1">{edu.period}</p>
                                        <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <div className="bg-primary rounded-full p-2">
                                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
