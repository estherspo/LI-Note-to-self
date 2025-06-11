
"use client";

import Link from 'next/link';
import { Linkedin, Users, UserPlus, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <Linkedin className="h-8 w-8" />
            {/* Rememble text removed */}
          </Link>
          <div className="relative ml-4 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 h-9 w-[200px] lg:w-[250px] bg-muted/50 focus:bg-background"
              // This input is not functional for now
            />
          </div>
        </div>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1.5">
              <Home className="h-5 w-5" />
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
