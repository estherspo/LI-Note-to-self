
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, UserCheck, UserCircle, SearchCode } from 'lucide-react'; // Corrected UserCircle import if it was CircleUser
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navigationStates = [
  { name: 'Send Request', href: '/invite/jane-doe', icon: Send, description: "Mock sending an invitation to a new profile." },
  { name: 'Accept Request', href: '/accept-request', icon: UserCheck, description: "Simulate accepting an incoming request." },
  { name: 'View Connection Note', href: '/view-profile-note', icon: UserCircle, description: "View an existing connection's profile and private note." },
  { name: 'Search Network', href: '/', icon: SearchCode, description: "Search your connections by name, headline, or note." },
];

export function StateNavigator() {
  const pathname = usePathname();
  const [activeStateHref, setActiveStateHref] = useState<string | null>(null);

  useEffect(() => {
    let newActiveHref: string | null = null;
    const sendRequestStateDefinition = navigationStates.find(state => state.name === 'Send Request');

    if (sendRequestStateDefinition && pathname.startsWith('/invite/')) {
      newActiveHref = sendRequestStateDefinition.href;
    } else {
      const matchedState = navigationStates.find(state => state.href === pathname);
      if (matchedState) {
        newActiveHref = matchedState.href;
      }
    }
    setActiveStateHref(newActiveHref);
  }, [pathname]);

  return (
    <Card className="sticky bottom-0 left-0 right-0 w-full z-40 bg-card border-t shadow-lg rounded-none">
      <CardHeader className="pb-3 pt-4 container mx-auto px-4">
        <CardTitle className="text-base font-headline text-primary">Prototype State Navigator</CardTitle>
        <CardDescription className="text-xs">Use these buttons to switch between different app states/features for Rememble.</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 pt-0 container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {navigationStates.map((state) => {
            const isButtonActive = activeStateHref === state.href;
            return (
              <Button
                key={state.name}
                variant={isButtonActive ? 'default' : 'outline'}
                className={cn(
                  "w-full justify-start text-left h-auto py-1.5 px-2 flex-col items-start sm:flex-row sm:items-center sm:py-2 sm:px-3",
                  isButtonActive && "ring-2 ring-primary ring-offset-1"
                )}
                asChild
                size="sm"
              >
                <Link href={state.href}>
                  <state.icon className="mr-0 mb-0.5 sm:mr-1.5 sm:mb-0 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col whitespace-normal"> {/* Added whitespace-normal here */}
                    <span className="text-xs font-medium">{state.name}</span>
                    <span className="hidden md:block text-xs text-muted-foreground mt-0.5 leading-tight">{state.description}</span>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
