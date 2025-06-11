"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConnections } from '@/hooks/useConnections';
import type { Profile as ProfileType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvitationDialog } from '@/components/invitation/InvitationDialog';
import { Building, MapPin, UserPlus, CheckCircle2, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.profileId as string;
  
  const { getProfileToInvite, connections, isLoading: connectionsLoading } = useConnections();
  const [profile, setProfile] = useState<ProfileType | null | undefined>(undefined); // undefined for loading, null for not found
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (profileId && !connectionsLoading) {
      const fetchedProfile = getProfileToInvite(profileId);
      setProfile(fetchedProfile);
    }
  }, [profileId, getProfileToInvite, connectionsLoading]);

  const isAlreadyConnected = connections.some(conn => conn.id.includes(profileId));

  const handleConnect = () => {
    if (isAlreadyConnected) {
      // Maybe navigate to their profile or show their existing note
      // For now, let's allow opening dialog to update note if desired,
      // but the dialog should reflect they are already connected.
      // This logic should be more robust in a real app.
      // toast({ title: "Already Connected", description: `You are already connected with ${profile?.name}.`});
    }
    setIsDialogOpen(true);
  };

  if (profile === undefined || connectionsLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <div className="h-48 bg-muted animate-pulse" />
          <CardHeader className="relative -mt-16">
            <Skeleton className="h-32 w-32 rounded-full border-4 border-background bg-muted mx-auto" />
            <Skeleton className="h-8 w-1/2 mx-auto mt-4 bg-muted" />
            <Skeleton className="h-5 w-3/4 mx-auto mt-2 bg-muted" />
          </CardHeader>
          <CardContent className="text-center space-y-2 pb-6">
            <Skeleton className="h-5 w-1/2 mx-auto bg-muted" />
            <Skeleton className="h-5 w-1/3 mx-auto bg-muted" />
            <Skeleton className="h-10 w-32 mx-auto mt-4 bg-muted" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader><Skeleton className="h-6 w-1/4 bg-muted" /></CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profile === null) {
    return (
       <Alert variant="destructive" className="max-w-lg mx-auto">
        <Info className="h-4 w-4" />
        <AlertTitle>Profile Not Found</AlertTitle>
        <AlertDescription>
          The profile you are trying to view does not exist or could not be loaded.
          <Button onClick={() => router.push('/')} variant="link" className="pl-1">Go to My Network</Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  const coverPhotoUrl = "https://placehold.co/1200x300.png"; // Generic cover

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted-foreground">
           <Image 
            src={coverPhotoUrl} 
            alt={`${profile.name}'s cover photo`} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="professional network background"
          />
        </div>
        <CardHeader className="relative -mt-[64px] px-6 pb-2"> {/* LinkedIn style avatar offset */}
          <Avatar className="h-32 w-32 rounded-full border-4 border-card bg-card mx-auto sm:mx-0">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint || "profile person"} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="pt-4 sm:ml-[152px] sm:-mt-[calc(128px-32px)]"> {/* Adjust for avatar size and desired text position */}
             <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                    <CardTitle className="font-headline text-3xl">{profile.name}</CardTitle>
                    <p className="text-lg text-foreground">{profile.headline}</p>
                </div>
                <Button onClick={handleConnect} className="mt-4 sm:mt-0 whitespace-nowrap" size="lg">
                  {isAlreadyConnected ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                  {isAlreadyConnected ? 'Connected' : 'Connect'}
                </Button>
             </div>

            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              {profile.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{profile.company}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pt-0 pb-6">
          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-lg mb-2">About</h4>
              <p className_ ="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{profile.bio}</p>
            </div>
          )}

          {profile.experience && profile.experience.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-lg mb-2">Experience</h4>
              <ul className="space-y-3">
                {profile.experience.map((exp, idx) => (
                  <li key={idx} className="text-sm text-foreground/80">{exp}</li>
                ))}
              </ul>
            </div>
          )}

          {profile.education && profile.education.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-lg mb-2">Education</h4>
              <ul className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <li key={idx} className="text-sm text-foreground/80">{edu}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {profile && (
        <InvitationDialog
          profile={profile}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          isAlreadyConnected={isAlreadyConnected}
        />
      )}
    </div>
  );
}
