
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navigationStates = [
  { name: "Invite Hunter (Salty's View)", href: '/invite/hunter-the-cat', description: "View Hunter The Cat's profile as Salty Sears to send an invitation." },
  { name: "Jack's Profile", href: '/invite/jack-cray-the-cat', description: "View Jack The Cat's profile as Hunter to send an invitation or view existing connection." },
  { name: "My Network (Hunter's View)", href: '/my-network', description: "View your network, manage invitations, and play daily games." },
  { name: "View Note to self (Hunter's View)", href: '/view-profile-note', description: "View an existing connection's profile and private note." },
];

export function StateNavigator() {
  const pathname = usePathname();
  const [activeStateHref, setActiveStateHref] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 

    let newActiveHref: string | null = null;
    const inviteHunterState = navigationStates.find(state => state.name === "Invite Hunter (Salty's View)");
    const inviteJackState = navigationStates.find(state => state.name === "Jack's Profile");


    if (inviteHunterState && pathname === inviteHunterState.href) {
      newActiveHref = inviteHunterState.href;
    } else if (inviteJackState && pathname === inviteJackState.href) {
      newActiveHref = inviteJackState.href;
    } else if (pathname.startsWith('/invite/')) { // General invite page catch-all if not Hunter or Jack specifically
      // Try to find if the current invite path matches any *other* specific invite state.
      // For now, only Hunter and Jack have specific top-level states.
      // If it's another profile ID, it won't highlight a specific state button unless we add more.
      // This logic prioritizes specific named invite states.
      const specificInviteMatch = navigationStates.find(state => state.href === pathname && state.href.startsWith('/invite/'));
      if (specificInviteMatch) {
        newActiveHref = specificInviteMatch.href;
      }
    } else {
      const matchedState = navigationStates.find(state => state.href === pathname);
      if (matchedState) {
        newActiveHref = matchedState.href;
      }
    }
    setActiveStateHref(newActiveHref);
  }, [pathname]);

  return (
    <Card className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 z-60 bg-card border-r shadow-lg rounded-none overflow-y-auto">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-md font-headline text-primary">Prototype State Navigator</CardTitle>
        <CardDescription className="text-xs text-muted-foreground leading-tight mt-1">
          Use these buttons to switch between different app states/features for Rememble.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          {navigationStates.map((state) => {
            const isButtonActive = activeStateHref === state.href;
            return (
              <Button
                key={state.href}
                variant={isMounted && isButtonActive ? 'default' : 'secondary'}
                className={cn(
                  "w-full justify-start text-left h-auto py-2.5 px-3",
                  isMounted && isButtonActive && "ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary"
                )}
                asChild
              >
                <Link href={state.href}>
                  <div className="flex flex-col items-start w-full">
                    <span className="text-sm font-medium leading-snug">
                      {isMounted ? state.name : "\u00A0"}
                    </span>
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
