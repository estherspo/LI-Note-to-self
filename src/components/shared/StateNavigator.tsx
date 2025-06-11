
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navigationStates = [
  { name: "Invite Hunter (Salty's View)", href: '/invite/hunter-the-cat', description: "View Hunter The Cat's profile as Salty Sears to send an invitation." },
  { name: "My Network", href: '/my-network', description: "View your network, manage invitations, and play daily games." },
  { name: 'View Connection Note', href: '/view-profile-note', description: "View an existing connection's profile and private note." },
];

export function StateNavigator() {
  const pathname = usePathname();
  const [activeStateHref, setActiveStateHref] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 

    let newActiveHref: string | null = null;
    const inviteStateDefinition = navigationStates.find(state => state.name === "Invite Hunter (Salty's View)");

    if (inviteStateDefinition && pathname.startsWith('/invite/')) {
      newActiveHref = inviteStateDefinition.href;
    } else {
      const matchedState = navigationStates.find(state => state.href === pathname);
      if (matchedState) {
        newActiveHref = matchedState.href;
      }
    }
    setActiveStateHref(newActiveHref);
  }, [pathname]);

  return (
    <Card className="dark sticky bottom-0 left-0 right-0 w-full z-[60] bg-card border-t shadow-lg rounded-none">
      <CardHeader className="pb-1 pt-2 container mx-auto px-4">
        <CardTitle className="text-sm font-headline text-primary">Prototype State Navigator</CardTitle>
        <CardDescription className="text-xs text-muted-foreground leading-tight">Use these buttons to switch between different app states/features for Rememble.</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-1 container mx-auto px-4">
        <div className={cn(
            "grid gap-2",
            navigationStates.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
          )}
        >
          {navigationStates.map((state) => {
            const isButtonActive = activeStateHref === state.href;
            return (
              <Button
                key={state.name}
                variant={isMounted && isButtonActive ? 'default' : 'outline'} 
                className={cn(
                  "w-full justify-center text-center h-auto py-1 px-2", 
                  isMounted && isButtonActive && "ring-2 ring-primary ring-offset-1 ring-offset-background" 
                )}
                asChild
                size="sm"
              >
                <Link href={state.href}>
                  <div className="flex flex-col whitespace-normal items-center justify-center">
                    <span className="text-xs font-medium leading-tight">{state.name}</span>
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
