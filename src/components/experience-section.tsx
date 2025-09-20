import { Briefcase } from 'lucide-react';
import { experiences } from '@/lib/data';

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Experience</h2>
                </div>
                 <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative mb-12">
                            <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                    <div className="bg-background p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">{exp.role}</h3>
                                        <p className="text-muted-foreground">{exp.company}</p>
                                        <p className="text-sm text-primary font-semibold mt-1">{exp.period}</p>
                                        <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <div className="bg-primary rounded-full p-2">
                                    <Briefcase className="h-6 w-6 text-primary-foreground" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}