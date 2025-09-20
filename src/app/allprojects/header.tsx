
'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className={'sticky top-0 z-50 w-full bg-card/80 backdrop-blur-sm shadow-md'}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">Portfolio Pilot</span>
        </Link>
        
        <nav>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
