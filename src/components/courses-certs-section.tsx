import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface CoursesCertsSectionProps {
    certifications: Course[];
}

export default function CoursesCertsSection({ certifications }: CoursesCertsSectionProps) {
    return (
        <section id="courses-certifications" className="py-6 md:py-8 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Courses and Certifications</h2>
                </div>
                 <Card>
                    <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {(certifications || []).map((cert, i) => (
                                <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{cert.name}</p>
                                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                    </div>
                                    {cert.url && (
                                        <Button asChild variant="link" className="p-0 h-auto mt-2 sm:mt-0">
                                            <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                                                View Certificate
                                                <ArrowUpRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
