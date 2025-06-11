
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConnections } from '@/hooks/useConnections';
import type { Profile, Connection, PendingInvitation } from '@/lib/types';
import { mockProfiles as allMockProfiles } from '@/data/mockProfiles';
import { Users, Feather, Dot, PawPrint, CheckCircle2, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PostAcceptNoteDialog } from '@/components/connections/PostAcceptNoteDialog';
import { PendingInvitationItem } from '@/components/accept-request/PendingInvitationItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyNetworkPage() {
  const { addConnection, connections } = useConnections();
  const { toast } = useToast();
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([]);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [noteDialogConnection, setNoteDialogConnection] = useState<Connection | null>(null);
  const [recentlyAcceptedConnection, setRecentlyAcceptedConnection] = useState<Profile | null>(null);

  useEffect(() => {
    const currentUserId = 'hunter-the-cat';

    const invitationProfileIdsOrder = ['salty-sears', 'jack-cray-the-cat', 'george-sweeney-the-cat'];

    const invitations: PendingInvitation[] = invitationProfileIdsOrder.map(profileId => {
      const profile = allMockProfiles.find(p => p.id === profileId);

      if (!profile || profile.id === currentUserId || connections.some(c => c.id.includes(profile.id))) {
        return null;
      }

      if (profile.id === 'salty-sears') {
        return {
          ...profile,
          message: "It was great meeting you at CatCon! Let's connect.",
          mutualConnectionsText: undefined,
          isVerified: true,
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: false,
        };
      }
      if (profile.id === 'jack-cray-the-cat') {
        return {
          ...profile,
          mutualConnectionsText: "Lucy Cray The Cat is a mutual connection",
          isVerified: true,
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: false,
        };
      }
      if (profile.id === 'george-sweeney-the-cat') {
        return {
          ...profile,
          message: "Heard you're the go-to cat for gourmet catnip reviews. Would love to pick your brain!",
          mutualConnectionsText: undefined,
          isVerified: false,
          showLinkedInIcon: false,
          showLinkedInPremiumIcon: true,
        };
      }
      return {
        ...profile,
        isVerified: false,
        showLinkedInIcon: false,
        showLinkedInPremiumIcon: false,
      };
    }).filter(invitation => invitation !== null) as PendingInvitation[];

    setPendingInvitations(invitations);
  }, [connections]);

  const handleAccept = (inviter: PendingInvitation) => {
    const originalProfile = allMockProfiles.find(p => p.id === inviter.id);
    if (originalProfile) {
      const newConnection = addConnection(originalProfile, undefined);

      setPendingInvitations(prev => prev.filter(p => p.id !== inviter.id));
      setRecentlyAcceptedConnection(originalProfile); // Show inline confirmation
      toast({
        title: (
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span>Connection Accepted</span>
          </div>
        ),
        description: (
          <span>You are now connected with {inviter.name}.</span>
        ),
      });

      if (newConnection) {
        setNoteDialogConnection(newConnection);
        setIsAddNoteDialogOpen(true);
      }
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

  const handleDismissRecentlyAcceptedMessage = () => {
    setRecentlyAcceptedConnection(null);
  };

  const dailyGames = [
    {
      icon: Feather,
      title: "Feather Frenzy",
      description: "Cats goes wild for the flapping, swooping feather beast!",
      iconColorClass: "text-primary",
      buttonClasses: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      icon: Dot,
      title: "Dot of Doom",
      description: "That sneaky red dot must be caught… no matter the cost!",
      iconColorClass: "text-red-600",
      buttonClasses: "bg-red-600 text-white hover:bg-red-700",
    },
    {
      icon: PawPrint,
      title: "Shadow Stalker",
      description: "Unseen foes lurk, requiring swift paw-eye coordination and tactical pounces!",
      iconColorClass: "text-yellow-500",
      buttonClasses: "bg-yellow-500 text-black hover:bg-yellow-600",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-0 sm:px-4 pb-8 space-y-6">
        <Card className="shadow-lg">
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
                  <CardTitle className="text-xl font-semibold">Accept Requests ({pendingInvitations.length})</CardTitle>
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary p-0 h-auto" disabled>Show all</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {recentlyAcceptedConnection && (
                  <div className="px-4 py-3 border-b border-border bg-card">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={recentlyAcceptedConnection.avatarUrl} alt={recentlyAcceptedConnection.name} data-ai-hint={recentlyAcceptedConnection.dataAiHint || "profile person"} />
                        <AvatarFallback>{recentlyAcceptedConnection.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-sm text-foreground">
                        <span className="font-semibold">{recentlyAcceptedConnection.name}</span> is now a connection.
                        {' '}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary font-semibold hover:underline"
                          onClick={() => { /* Placeholder for message action */ }}
                        >
                          Message {recentlyAcceptedConnection.name.split(' ')[0]}
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-muted/50" onClick={handleDismissRecentlyAcceptedMessage}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>
                )}
                {pendingInvitations.length === 0 && !recentlyAcceptedConnection ? (
                  <div className="text-center py-12 px-4 sm:px-6">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-lg font-medium text-foreground">No pending invitations</p>
                    <p className="text-sm text-muted-foreground">When someone invites you to connect, you'll see their invitation here.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {pendingInvitations.map((inviter) => (
                      <PendingInvitationItem
                        key={inviter.id}
                        inviter={inviter}
                        onAccept={handleAccept}
                        onIgnore={handleIgnore}
                      />
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

        <Card className="shadow-lg">
          <CardHeader className="px-4 sm:px-6 py-4">
            <CardTitle className="text-xl font-semibold">
              Play daily games
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyGames.map((game, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm space-y-3 bg-card">
                  <game.icon className={`h-10 w-10 mb-1 ${game.iconColorClass}`} />
                  <h4 className="text-lg font-semibold text-foreground">{game.title}</h4>
                  <p className="text-sm text-muted-foreground flex-grow min-h-[50px]">{game.description}</p>
                  <Button className={`${game.buttonClasses} w-full sm:w-auto`}>Play</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {noteDialogConnection && (
        <PostAcceptNoteDialog
          isOpen={isAddNoteDialogOpen}
          onOpenChange={setIsAddNoteDialogOpen}
          connection={noteDialogConnection}
        />
      )}
    </>
  );
}
