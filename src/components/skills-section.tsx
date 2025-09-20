'use client';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function SkillsSection() {
    const [category, setCategory] = useState<'All' | 'Research' | 'Technical' | 'Hobby'>('All');

    const filteredSkills = category === 'All'
        ? skills
        : skills.filter(skill => skill.category === category);

    return (
        <section id="skills" className="py-6 md:py-8 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Skills</h2>
                </div>
                <div className="flex justify-center gap-2 mb-8">
                    <Button variant={category === 'All' ? 'default' : 'outline'} onClick={() => setCategory('All')}>All</Button>
                    <Button variant={category === 'Research' ? 'default' : 'outline'} onClick={() => setCategory('Research')}>Research</Button>
                    <Button variant={category === 'Technical' ? 'default' : 'outline'} onClick={() => setCategory('Technical')}>Technical</Button>
                    <Button variant={category === 'Hobby' ? 'default' : 'outline'} onClick={() => setCategory('Hobby')}>Hobby</Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{category} Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {filteredSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-sm flex items-center gap-1.5 py-1 px-2">
                                <skill.icon className="h-4 w-4" />
                                {skill.name}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
