
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
    setIsDialogOpen(true);
  };

  if (profile === undefined || connectionsLoading) {
    return (
      <div className="w-full space-y-6"> {/* Changed: Removed max-w-3xl mx-auto, added w-full */}
        <Card>
          <div className="h-48 bg-muted animate-pulse" /> {/* Cover photo skeleton */}
          <CardHeader className="relative -mt-[64px] px-6 pb-2 flex flex-row items-start gap-4"> {/* Flex header, -mt-16 is -4rem or -64px */}
            <Skeleton className="h-32 w-32 rounded-full border-4 border-background bg-muted flex-shrink-0" /> {/* Avatar skeleton */}
            <div className="flex-1 pt-4"> {/* Main text block wrapper for skeleton */}
              <div className="flex flex-row justify-between items-start">
                <div className="flex-1 space-y-2 mr-4"> {/* Name and Headline wrapper */}
                  <Skeleton className="h-8 w-3/4 bg-muted" /> {/* Name skeleton */}
                  <Skeleton className="h-5 w-full bg-muted" /> {/* Headline skeleton */}
                </div>
                <Skeleton className="h-10 w-32 bg-muted" /> {/* Button Skeleton */}
              </div>
              <div className="mt-2 space-y-1"> {/* Company/Location wrapper for skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 bg-muted" />
                  <Skeleton className="h-4 w-1/2 bg-muted" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-4 w-4 bg-muted" />
                  <Skeleton className="h-4 w-1/3 bg-muted" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pt-10 pb-6 space-y-8"> {/* Adjusted pt for space after header */}
            <div>
              <Skeleton className="h-6 w-1/4 mb-3 bg-muted" /> {/* "About" title skeleton */}
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-5/6 bg-muted mt-2" />
              <Skeleton className="h-4 w-full bg-muted mt-2" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/4 mb-3 bg-muted" /> {/* "Experience" title skeleton */}
              <Skeleton className="h-4 w-full bg-muted mb-2" />
              <Skeleton className="h-4 w-full bg-muted" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/4 mb-3 bg-muted" /> {/* "Education" title skeleton */}
              <Skeleton className="h-4 w-full bg-muted mb-2" />
              <Skeleton className="h-4 w-full bg-muted" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profile === null) {
    return (
       <Alert variant="destructive" className="max-w-lg mx-auto"> {/* Keep max-w-lg for error message centering */}
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
    <div className="w-full space-y-6"> {/* Changed: Removed max-w-3xl mx-auto, added w-full */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted-foreground">
           <Image 
            src={coverPhotoUrl} 
            alt={`${profile.name}'s cover photo`} 
            fill
            objectFit="cover"
            data-ai-hint="professional network background"
          />
        </div>
        <CardHeader className="relative -mt-[64px] px-6 pb-2 flex flex-row items-start gap-4"> {/* Flexbox for avatar and text block */}
          <Avatar className="h-32 w-32 rounded-full border-4 border-card bg-card flex-shrink-0">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint || "profile person"} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pt-5"> {/* Text content block, pt-5 for vertical alignment with avatar */}
             <div className="flex flex-row justify-between items-start">
                <div className="flex-1 mr-4"> {/* Added mr-4 to give space for button */}
                    <CardTitle className="font-headline text-3xl">{profile.name}</CardTitle>
                    <p className="text-lg text-foreground">{profile.headline}</p>
                </div>
                <Button onClick={handleConnect} className="whitespace-nowrap" size="lg">
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
        
        <CardContent className="px-6 pt-4 pb-6">
          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-lg mb-2">About</h4>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{profile.bio}</p>
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

