import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { honorsAndAwards } from '@/lib/data';

export default function AchievementsSection() {
    return (
        <section id="achievements" className="py-6 md:py-8 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Achievements</h2>
                </div>
                <Card>
                    <CardHeader><CardTitle>Honors & Awards</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {honorsAndAwards.map((award) => <li key={award.id}>{award.description}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
