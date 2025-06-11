
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConnections } from '@/hooks/useConnections';
import type { Profile } from '@/lib/types';
import { mockProfiles as allMockProfiles } from '@/data/mockProfiles';
import { Users, Link2, MoreHorizontal } from 'lucide-react'; 
import { useToast } from "@/hooks/use-toast";

interface PendingInvitation extends Profile {
  message?: string;
  mutualConnectionsText?: string;
  isVerified?: boolean; 
  showLinkedInIcon?: boolean; 
  showLinkedInPremiumIcon?: boolean; 
}

export default function AcceptRequestPage() {
  const { addConnection, connections } = useConnections();
  const { toast } = useToast();
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([]);

  useEffect(() => {
    const currentUserId = 'jane-doe'; 

    const invitationProfileIdsOrder = ['salty-sears', 'bob-brown', 'emily-white'];

    const invitations: PendingInvitation[] = invitationProfileIdsOrder.map(profileId => {
      const profile = allMockProfiles.find(p => p.id === profileId);

      if (!profile || profile.id === currentUserId || connections.some(c => c.id.includes(profile.id))) {
        return null;
      }

      if (profile.id === 'salty-sears') { // Salty Sears The Cat
        return {
          ...profile,
          message: "It was great meeting you at CatCon! Let's connect.",
          mutualConnectionsText: undefined,
          isVerified: false,
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: false,
        };
      }
      if (profile.id === 'bob-brown') { // Jack Cray The Cat
        return {
          ...profile,
          mutualConnectionsText: "Lucy Cray The Cat is a mutual connection",
          isVerified: false, 
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: false,
        };
      }
      if (profile.id === 'emily-white') { // George Sweeney The Cat
        return {
          ...profile,
          message: "Heard you're the go-to cat for gourmet catnip reviews. Would love to pick your brain!",
          mutualConnectionsText: undefined,
          isVerified: false,
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: true, 
        };
      }
      return null;
    }).filter(invitation => invitation !== null) as PendingInvitation[];

    setPendingInvitations(invitations);
  }, [connections]);

  const handleAccept = (inviter: PendingInvitation) => {
    const originalProfile = allMockProfiles.find(p => p.id === inviter.id);
    if (originalProfile) {
      addConnection(originalProfile, `Accepted connection with ${inviter.name}.`);
      setPendingInvitations(prev => prev.filter(p => p.id !== inviter.id));
      toast({
        title: "Connection Accepted",
        description: `You are now connected with ${inviter.name}.`,
      });
    }
  };

  const handleIgnore = (inviterId: string) => {
    setPendingInvitations(prev => prev.filter(p => p.id !== inviterId));
    const inviter = pendingInvitations.find(p => p.id === inviterId);
    if (inviter) {
        toast({
            title: "Invitation Ignored",
            description: `Invitation from ${inviter.name} has been ignored.`,
            variant: "default", 
        });
    }
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-8">
      <Card className="shadow-lg"> {/* Removed max-w-3xl and mx-auto */}
        <Tabs defaultValue="grow" className="w-full">
          <CardHeader className="p-0 border-b">
            <TabsList className="grid w-full grid-cols-2 h-14 rounded-none bg-card p-0">
              <TabsTrigger 
                value="grow" 
                className="text-base h-full rounded-none text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-muted-foreground data-[state=active]:shadow-none"
              >
                Grow
              </TabsTrigger>
              <TabsTrigger 
                value="catchup" 
                className="text-base h-full rounded-none text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-muted-foreground data-[state=active]:shadow-none"
                disabled
              >
                Catch up
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="grow">
            <CardHeader className="px-4 sm:px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Invitations ({pendingInvitations.length})</CardTitle>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary p-0 h-auto" disabled>Show all</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {pendingInvitations.length === 0 ? (
                <div className="text-center py-12 px-4 sm:px-6">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-lg font-medium text-foreground">No pending invitations</p>
                  <p className="text-sm text-muted-foreground">When someone invites you to connect, you'll see their invitation here.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {pendingInvitations.map((inviter) => (
                    <li key={inviter.id} className="px-4 sm:px-6 py-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14 border">
                          <AvatarImage src={inviter.avatarUrl} alt={inviter.name} data-ai-hint={inviter.dataAiHint || "profile person"} />
                          <AvatarFallback>{inviter.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <h3 className="text-lg font-semibold text-foreground hover:underline">
                              <Link href={`/invite/${inviter.id}`}>{inviter.name}</Link>
                            </h3>
                            {inviter.showLinkedInPremiumIcon && (
                              <span className="ml-1 inline-flex items-center justify-center h-[16px] w-[16px] bg-amber-500 rounded-sm p-0.5 align-middle">
                                <span className="text-white text-[9px] font-bold leading-none">in</span>
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-snug">{inviter.headline}</p>
                          {inviter.mutualConnectionsText && (
                             <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Link2 className="h-3 w-3 mr-1"/>
                                {inviter.mutualConnectionsText}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 shrink-0">
                          <Button variant="outline" size="sm" onClick={() => handleIgnore(inviter.id)} className="text-muted-foreground hover:border-primary">Ignore</Button>
                          <Button size="sm" onClick={() => handleAccept(inviter)}>Accept</Button>
                        </div>
                      </div>
                      {inviter.message && (
                        <Card className="mt-3 ml-0 sm:ml-[72px] bg-muted/30 shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {inviter.message.length > 150 ? (
                                        <>
                                        {inviter.message.substring(0, 150)}... 
                                        <Button variant="link" className="text-xs p-0 h-auto ml-1" disabled>show more</Button>
                                        </>
                                    ) : inviter.message}
                                </p>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-background/50" disabled>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-sm mt-2" disabled>Reply to {inviter.name.split(' ')[0]}</Button>
                          </CardContent>
                        </Card>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </TabsContent>
          <TabsContent value="catchup">
            <CardContent className="py-12 text-center">
              <p>Catch up content will go here.</p>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
