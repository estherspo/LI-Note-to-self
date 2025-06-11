
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
import { Building, MapPin, UserPlus, CheckCircle2, Info, Users, MessageSquare, Check, ShieldCheck } from 'lucide-react';
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
    setIsDialogOpen(true);
  };

  if (profile === undefined || connectionsLoading) {
    return (
      <div className="w-full space-y-6">
        <Card className="overflow-hidden">
          <div className="h-48 bg-muted animate-pulse" /> {/* Cover photo skeleton */}
          <CardHeader className="relative -mt-[64px] px-6 pt-0 pb-6 flex flex-col">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background bg-card self-center sm:self-start">
                <Skeleton className="h-full w-full rounded-full bg-muted" />
            </Avatar>
            
            <div className="w-full mt-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                <div className="w-full sm:w-auto text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Skeleton className="h-8 w-40 bg-muted" /> 
                    <Skeleton className="ml-2 h-6 w-6 bg-muted rounded-full" />
                    <Skeleton className="ml-1 h-5 w-10 bg-muted" />
                  </div>
                </div>
                <div className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center sm:justify-end gap-2">
                  <Skeleton className="h-8 w-8 bg-muted rounded-full" />
                  <Skeleton className="h-5 w-24 bg-muted" />
                </div>
              </div>

              <Skeleton className="h-5 w-5/6 bg-muted mb-2 mx-auto sm:mx-0" />
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-4 mb-2">
                <Skeleton className="h-10 w-full sm:w-28 bg-muted rounded-full" />
                <Skeleton className="h-10 w-full sm:w-28 bg-muted rounded-full" />
                <Skeleton className="h-10 w-full sm:w-20 bg-muted rounded-full" />
              </div>

              <Skeleton className="h-4 w-1/2 bg-muted mb-2 mx-auto sm:mx-0" />
              <Skeleton className="h-4 w-1/3 bg-muted mb-2 mx-auto sm:mx-0" />
              
              <div className="flex items-center gap-1 mb-4 justify-center sm:justify-start">
                <Skeleton className="h-4 w-4 bg-muted rounded-full"/>
                <Skeleton className="h-4 w-28 bg-muted" />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3 bg-muted" />
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted mt-2" />
            <Skeleton className="h-4 w-full bg-muted mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4 bg-muted" /> {/* "Experience" title */}
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-3/4 bg-muted" /> 
              <Skeleton className="h-4 w-1/2 bg-muted" /> 
              <Skeleton className="h-3 w-1/3 bg-muted" /> 
              <div className="pl-5 pt-1 space-y-1.5">
                <Skeleton className="h-4 w-full bg-muted" /> 
                <Skeleton className="h-4 w-5/6 bg-muted" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-2/3 bg-muted" />
              <Skeleton className="h-4 w-1/2 bg-muted" />
              <Skeleton className="h-3 w-1/3 bg-muted" />
            </div>
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
  
  const coverPhotoUrl = "https://placehold.co/1200x300.png";
  const companyDomain = profile.company ? profile.company.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '.com' : '';


  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted-foreground">
           <Image 
            src={coverPhotoUrl} 
            alt={`${profile.name}'s cover photo`} 
            fill
            style={{objectFit: "cover"}}
            data-ai-hint="professional network background"
          />
        </div>
        <CardHeader className="relative -mt-[64px] px-6 pt-0 pb-6 flex flex-col">
          <Avatar className="h-32 w-32 rounded-full border-4 border-card bg-card self-center sm:self-start">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint || "profile person"} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="w-full mt-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
              <div className="w-full sm:w-auto text-center sm:text-left">
                <CardTitle className="font-headline text-3xl flex items-center justify-center sm:justify-start">
                  {profile.name}
                  <ShieldCheck className="ml-2 h-6 w-6 text-primary" fill="currentColor" />
                  <span className="ml-1 text-sm text-muted-foreground font-normal">· 2nd</span>
                </CardTitle>
              </div>
              {profile.company && (
                <div className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center sm:justify-end gap-2 text-sm">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://logo.clearbit.com/${companyDomain}`} alt={`${profile.company} logo`} data-ai-hint="company logo" />
                    <AvatarFallback><Building className="h-4 w-4"/></AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-foreground">{profile.company}</span>
                </div>
              )}
            </div>

            <p className="text-lg text-foreground mb-2 text-center sm:text-left">{profile.headline}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-4 mb-2">
              <Button onClick={handleConnect} size="lg" className="whitespace-nowrap rounded-full">
                {isAlreadyConnected ? <MessageSquare className="mr-2 h-5 w-5"/> : <UserPlus className="mr-2 h-5 w-5" />}
                {isAlreadyConnected ? 'Message' : 'Connect'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-card border-foreground text-foreground disabled:opacity-100" 
                disabled
              >
                {isAlreadyConnected ? <Check className="mr-2 h-4 w-4"/> : null}
                {isAlreadyConnected ? 'Following' : 'Follow'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-card border-foreground text-foreground disabled:opacity-100" 
                disabled
              >
                More
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2 text-center sm:text-left mt-2">
              {profile.location && (
                <span>{profile.location}</span>
              )}
              <span className="text-primary hover:underline cursor-pointer ml-1">· Contact info</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 text-center sm:text-left">
              8,141 followers · 500+ connections {/* Mocked */}
            </p>

            <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1 justify-center sm:justify-start">
              <Users className="h-4 w-4"/>
              Followed by Perry Sportello {/* Mocked */}
            </p>
          </div>
        </CardHeader>
      </Card>

      {profile.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      {profile.experience && profile.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.experience.map((expEntry, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-semibold text-md">{expEntry.title}</h4>
                  <p className="text-sm text-foreground/90">{expEntry.company}</p>
                  <p className="text-xs text-muted-foreground">{expEntry.dates}</p>
                  {expEntry.location && <p className="text-xs text-muted-foreground">{expEntry.location}</p>}
                  {expEntry.responsibilities && expEntry.responsibilities.length > 0 && (
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-foreground/80 pl-1">
                      {expEntry.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
    
