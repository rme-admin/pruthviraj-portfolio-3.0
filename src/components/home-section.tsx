//use the following code


import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, FileText } from 'lucide-react';

interface HomeSectionProps {
  userDetails: {
    first_name: string;
    last_name: string;
    short_description: string;
    profile_url: string; // This will now be the full URL
    cv_url: string;       // This will now be the full URL
    cover_letter_url: string; // This will now be the full URL
  };
}

export default function HomeSection({ userDetails }: HomeSectionProps) {
  const { 
    first_name, 
    last_name, 
    short_description, 
    profile_url, 
    cv_url, 
    cover_letter_url 
  } = userDetails || {};
  
  return (
    <section 
      id="home" 
      className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center bg-background overflow-hidden pt-12 pb-10"
    >
      {profile_url && (
        <Image
          src={profile_url} // <-- CORRECTED: Use the prop directly
          alt="Blurred background"
          fill
          priority
          className="object-cover blur-xl brightness-50 z-0"
        />
      )}
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
            {profile_url && (
                <div className="mb-6 rounded-full overflow-hidden border-4 border-card shadow-lg w-48 h-48">
                    <Image
                        src={profile_url} // <-- CORRECTED: Use the prop directly
                        alt={`${first_name} ${last_name}`}
                        width={192}
                        height={192}
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
                {first_name} {last_name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">
                {short_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                {cover_letter_url && (
                  <Button asChild size="lg" variant="outline">
                      <Link href={cover_letter_url} target="_blank" download> {/* <-- CORRECTED */}
                          Download Cover Letter
                          <FileText className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                )}
                {cv_url && (
                  <Button asChild size="lg">
                      <Link href={cv_url} target="_blank" download> {/* <-- CORRECTED */}
                          Download CV
                          <Download className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                )}
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-8 w-8 text-slate-300 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}