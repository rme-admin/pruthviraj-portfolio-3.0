'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { navigationLinks } from '@/lib/data';

function NavLinks({ isMobile, setMobileMenuOpen }: { isMobile: boolean, setMobileMenuOpen?: (open: boolean) => void }) {
  const closeMenu = () => setMobileMenuOpen?.(false);
  
  const mainNavLinks = navigationLinks.slice(0, 2);
  const projectLink = navigationLinks.find(l => l.name === 'Projects');
  const moreNavLinks = navigationLinks.slice(3);

  return (
    <>
      {mainNavLinks.map((link) => (
        <Link key={link.name} href={link.href!} className={isMobile ? "text-lg" : "transition-colors hover:text-primary"} onClick={closeMenu}>
          {link.name}
        </Link>
      ))}
      
      {projectLink && projectLink.sublinks && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="transition-colors hover:text-primary p-0">
              {projectLink.name} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {projectLink.sublinks.map((sublink) => (
              <DropdownMenuItem key={sublink.name} asChild>
                <Link href={sublink.href}>{sublink.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="transition-colors hover:text-primary p-0">
            More <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {moreNavLinks.map((link) => (
            <DropdownMenuItem key={link.name} asChild>
              <Link href={link.href!}>{link.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks isMobile={false} />
        </nav>
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                 <Link href="#home" className="flex items-center gap-2 mb-4" onClick={() => setMobileMenuOpen(false)}>
                    <Rocket className="h-7 w-7 text-primary" />
                    <span className="font-headline text-2xl font-bold">Portfolio Pilot</span>
                </Link>
                <NavLinks isMobile={true} setMobileMenuOpen={setMobileMenuOpen} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}