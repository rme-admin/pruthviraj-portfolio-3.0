import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { publications } from '@/lib/data';

export default function PublicationsSection() {
    return (
        <section id="publications" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Publications</h2>
                </div>
                <Card>
                    <CardHeader><CardTitle>Publications</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {publications.map((pub, i) => <li key={i}>{pub}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
