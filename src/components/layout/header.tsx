'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Menu, ChevronDown, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { navigationLinks } from '@/lib/data';

function NavLinks({ setMobileMenuOpen }: { setMobileMenuOpen: (open: boolean) => void }) {
  const closeMenu = () => setMobileMenuOpen(false);
  
  const projectLink = navigationLinks.find(l => l.name === 'Projects');
  const otherLinks = navigationLinks.filter(l => l.name !== 'Projects');

  return (
    <>
        {otherLinks.map((link) => (
            <Link
                key={link.name}
                href={link.href!}
                className="block text-lg py-2 px-4 rounded-md hover:bg-accent"
                onClick={closeMenu}
            >
            {link.name}
            </Link>
        ))}

        {projectLink && projectLink.sublinks && (
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="projects" className="border-b-0">
                <AccordionTrigger className="text-lg py-2 px-4 rounded-md hover:bg-accent [&[data-state=open]]:bg-accent">
                    <div className="flex items-center gap-2">
                        <span>{projectLink.name}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-2">
                    {projectLink.sublinks.map((sublink) => (
                        <Link
                            key={sublink.name}
                            href={sublink.href}
                            className="block text-base py-2 px-4 rounded-md hover:bg-accent/50"
                            onClick={closeMenu}
                        >
                            {sublink.name}
                        </Link>
                    ))}
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        )}
    </>
  );
}


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-card/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">Portfolio Pilot</span>
        </Link>
        
        <div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-2 p-4">
                 <Link href="#home" className="flex items-center gap-2 mb-4 p-4" onClick={() => setMobileMenuOpen(false)}>
                    <Rocket className="h-7 w-7 text-primary" />
                    <span className="font-headline text-2xl font-bold">Portfolio Pilot</span>
                </Link>
                <NavLinks setMobileMenuOpen={setMobileMenuOpen} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}