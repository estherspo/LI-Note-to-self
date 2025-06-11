"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useConnections } from '@/hooks/useConnections';
import type { Connection } from '@/lib/types';
import { PrivateNoteSection } from '@/components/connections/PrivateNoteSection';
import { Search, Trash2, UserX } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

export default function MyNetworkPage() {
  const { connections, isLoading, deleteConnection, mockProfiles } = useConnections();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingConnectionId, setEditingConnectionId] = useState<string | null>(null);

  const filteredConnections = useMemo(() => {
    if (!searchTerm) return connections;
    return connections.filter(conn =>
      conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (conn.privateNote && conn.privateNote.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [connections, searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Network</CardTitle>
            <CardDescription>Manage and remember your professional connections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse bg-muted h-10 w-full rounded-md mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-muted rounded-full h-12 w-12"></div>
                    <div className="space-y-1.5 flex-1">
                      <div className="bg-muted h-5 w-3/4 rounded"></div>
                      <div className="bg-muted h-4 w-1/2 rounded"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted h-8 w-full rounded mt-2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const profilesToInvite = mockProfiles.filter(p => !connections.some(c => c.id.includes(p.id)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">My Network</CardTitle>
          <CardDescription>Manage and remember your professional connections.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-2 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search connections by name, headline, or note..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredConnections.length === 0 && !searchTerm && (
             <Card className="text-center p-8 border-dashed">
              <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="font-headline text-xl mb-2">Your network is empty</CardTitle>
              <CardDescription className="mb-4">Start by inviting someone to connect.</CardDescription>
              {profilesToInvite.length > 0 && (
                <Button asChild>
                  <Link href={`/invite/${profilesToInvite[0].id}`}>Invite {profilesToInvite[0].name}</Link>
                </Button>
              )}
            </Card>
          )}

          {filteredConnections.length === 0 && searchTerm && (
            <p className="text-center text-muted-foreground py-8">No connections found matching your search.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((conn: Connection) => (
              <Card key={conn.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conn.avatarUrl} alt={conn.name} data-ai-hint={conn.dataAiHint || "profile person"} />
                    <AvatarFallback>{conn.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{conn.name}</h3>
                    <p className="text-sm text-muted-foreground">{conn.headline}</p>
                  </div>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove {conn.name} from your connections. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteConnection(conn.id)}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          >
                            Remove Connection
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="flex-grow">
                    <PrivateNoteSection
                      connectionId={conn.id}
                      initialNote={conn.privateNote}
                      isEditingInitially={editingConnectionId === conn.id}
                      onEditToggle={(isEditing) => setEditingConnectionId(isEditing ? conn.id : null)}
                    />
                  </div>
                   {conn.standardMessage && (
                    <div className="mt-4 pt-3 border-t">
                        <p className="text-xs text-muted-foreground font-medium">Message sent:</p>
                        <p className="text-sm italic">"{conn.standardMessage}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {profilesToInvite.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Suggested Invitations</CardTitle>
            <CardDescription>Expand your network by inviting these profiles.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profilesToInvite.slice(0,3).map(profile => (
              <Card key={profile.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint || "profile person"}/>
                      <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.headline}</p>
                    </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/invite/${profile.id}`}>Invite to Connect</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
