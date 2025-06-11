"use client";

import Link from 'next/link';
import { Linkedin, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <Linkedin className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-headline">Rememble</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1.5">
              <Users className="h-5 w-5" />
              <span className="hidden sm:inline">My Network</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/invite/jane-doe" className="flex items-center gap-1.5">
              <UserPlus className="h-5 w-5" />
               <span className="hidden sm:inline">Invite Jane (Demo)</span>
            </Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/invite/bob-brown" className="flex items-center gap-1.5">
              <UserPlus className="h-5 w-5" />
               <span className="hidden sm:inline">Invite Bob (Demo)</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
