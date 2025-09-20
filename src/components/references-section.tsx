import type { Reference } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';
import RequestLorDialog from './request-lor-dialog';

interface ReferencesSectionProps {
    references: Reference[];
}

export default function ReferencesSection({ references }: ReferencesSectionProps) {
    return (
        <section id="references" className="py-6 md:py-8 bg-background scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">References</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Professional references who can speak to my skills and experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {(references || []).map((reference, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{reference.fullName}</CardTitle>
                                <CardDescription>{reference.designation} at {reference.organization}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="text-muted-foreground">{reference.relation}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <a href={`mailto:${reference.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                        {reference.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <a href={`tel:${reference.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                                        {reference.phone}
                                    </a>
                                </div>
                                <div className="pt-4">
                                  <RequestLorDialog reference={reference} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
