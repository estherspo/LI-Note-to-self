
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, UserCheck, UserCircle, SearchCode } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigationStates = [
  { name: 'Send Request', href: '/invite/jane-doe', icon: Send, description: "Mock sending an invitation to a new profile." },
  { name: 'Accept Request', href: '/accept-request', icon: UserCheck, description: "Simulate accepting an incoming request." },
  { name: 'View Connection Note', href: '/view-profile-note', icon: UserCircle, description: "View an existing connection's profile and private note." },
  { name: 'Search Network', href: '/', icon: SearchCode, description: "Search your connections by name, headline, or note." },
];

export function StateNavigator() {
  const pathname = usePathname();

  // A simple heuristic to determine active state.
  // For '/invite/[profileId]', we check if pathname starts with '/invite/'.
  const isActive = (href: string) => {
    if (href === '/invite/jane-doe' && pathname.startsWith('/invite/')) {
      return true;
    }
    return pathname === href;
  };
  
  return (
    <Card className="mb-6 bg-primary/5 border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-headline text-primary">Prototype State Navigator</CardTitle>
        <CardDescription>Use these buttons to switch between different app states/features for Rememble.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {navigationStates.map((state) => (
            <Button
              key={state.name}
              variant={isActive(state.href) ? 'default' : 'outline'}
              className={cn(
                "w-full justify-start text-left h-auto py-2 px-3 flex-col items-start sm:flex-row sm:items-center sm:py-2 sm:px-4",
                isActive(state.href) && "ring-2 ring-primary ring-offset-2"
              )}
              asChild
            >
              <Link href={state.href}>
                <state.icon className="mr-0 mb-1 sm:mr-2 sm:mb-0 h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{state.name}</span>
                  <span className="hidden md:block text-xs text-muted-foreground mt-0.5">{state.description}</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
