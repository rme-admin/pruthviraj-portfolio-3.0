import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown, Download, FileText } from 'lucide-react';

export default function HomeSection() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full flex items-center justify-center text-center bg-background overflow-hidden pt-0 pb-8 md:pb-12">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] dark:bg-grid-slate-900/50"></div>
       <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
            {profileImage && (
                <div className="mb-6 rounded-full overflow-hidden border-4 border-card shadow-lg w-48 h-48">
                    <Image
                        src={profileImage.imageUrl}
                        alt={profileImage.description}
                        width={192}
                        height={192}
                        className="object-cover"
                        priority
                        data-ai-hint={profileImage.imageHint}
                    />
                </div>
            )}
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
                John Doe
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                A passionate Senior Software Engineer transforming complex problems into elegant, user-centric solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline">
                    <Link href="/cover-letter.pdf" target="_blank" download>
                        Download Cover Letter
                        <FileText className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/cv.pdf" target="_blank" download>
                        Download CV
                        <Download className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
