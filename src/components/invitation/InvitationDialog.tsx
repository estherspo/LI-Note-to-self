
"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Profile } from '@/lib/types';
import { useConnections } from '@/hooks/useConnections';
import { useToast } from '@/hooks/use-toast';
import { saveConnectionNote as serverSaveNote } from '@/lib/actions'; // Server action
import { Send, Loader2, CheckCircle2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface InvitationDialogProps {
  profile: Profile;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAlreadyConnected: boolean;
}

const MAX_STANDARD_MESSAGE_LENGTH = 300;
const MAX_PRIVATE_NOTE_LENGTH = 500;

export function InvitationDialog({ profile, isOpen, onOpenChange, isAlreadyConnected }: InvitationDialogProps) {
  const router = useRouter();
  const { addConnection, connections, updateConnectionNote } = useConnections();
  const existingConnection = connections.find(c => c.id.includes(profile.id));

  const [standardMessage, setStandardMessage] = useState('');
  const [privateNote, setPrivateNote] = useState(existingConnection?.privateNote || '');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset fields if dialog is reopened for a different profile or state changes
    if (isOpen) {
      setStandardMessage(''); // LinkedIn typically clears this
      setPrivateNote(existingConnection?.privateNote || '');
    }
  }, [isOpen, profile, existingConnection]);


  const handleSendInvitation = async () => {
    setIsSaving(true);
    try {
      if (isAlreadyConnected && existingConnection) {
        updateConnectionNote(existingConnection.id, privateNote);
         await serverSaveNote(existingConnection.id, privateNote, standardMessage); // Simulate server update for existing
        toast({
          title: "Private Note Updated",
          description: `Your private note for ${profile.name} has been updated.`,
        });
      } else {
        const newConn = addConnection(profile, privateNote, standardMessage);
        if (newConn) {
          await serverSaveNote(newConn.id, privateNote, standardMessage); // Simulate server save for new
        }
        toast({
          title: "Invitation Sent!",
          description: `Your invitation to ${profile.name} has been sent with your private note.`,
          action: (
            <Button variant="outline" size="sm" onClick={() => router.push('/')}>
              View Network
            </Button>
          ),
        });
      }
      onOpenChange(false);
    } catch (error) {
       toast({
        title: "Error",
        description: isAlreadyConnected ? "Could not update note." : "Could not send invitation.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const characterCountStandard = standardMessage.length;
  const characterCountPrivate = privateNote.length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-headline">
            {isAlreadyConnected ? `Update note for ${profile.name}` : `Invite ${profile.name} to connect`}
          </DialogTitle>
          {!isAlreadyConnected && (
            <div className="flex items-center gap-3 pt-2 pb-1">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint || "profile person"} />
                <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.headline}</p>
              </div>
            </div>
          )}
           {isAlreadyConnected && (
            <DialogDescription className="flex items-center gap-2 text-green-600 pt-2">
              <CheckCircle2 className="h-5 w-5"/> You are already connected with {profile.name}.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-2 space-y-4 max-h-[60vh] overflow-y-auto px-2">
          {!isAlreadyConnected && (
            <div className="space-y-1.5">
              <Label htmlFor="standardMessage">Add a note to send with your invite (optional). The person you're inviting will see this.</Label>
              <Textarea
                id="standardMessage"
                placeholder={`Hi ${profile.name.split(' ')[0]}, I'd like to connect...`}
                value={standardMessage}
                onChange={(e) => setStandardMessage(e.target.value)}
                maxLength={MAX_STANDARD_MESSAGE_LENGTH}
                className="min-h-[80px] border-input"
              />
              <div className={`text-xs ${characterCountStandard > MAX_STANDARD_MESSAGE_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}>
                {characterCountStandard}/{MAX_STANDARD_MESSAGE_LENGTH} characters
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="privateNote">Add a private note (only you can see this)</Label>
            <Textarea
              id="privateNote"
              placeholder="e.g., Met at a conference, shared interest in AI, potential collaborator..."
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
              maxLength={MAX_PRIVATE_NOTE_LENGTH}
              className="min-h-[100px] border-input"
            />
            <div className={`text-xs ${characterCountPrivate > MAX_PRIVATE_NOTE_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}>
              {characterCountPrivate}/{MAX_PRIVATE_NOTE_LENGTH} characters
            </div>
          </div>

        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="submit" 
            onClick={handleSendInvitation} 
            disabled={isSaving || characterCountStandard > MAX_STANDARD_MESSAGE_LENGTH || characterCountPrivate > MAX_PRIVATE_NOTE_LENGTH}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isAlreadyConnected ? (<><Save className="mr-2 h-4 w-4" />Save Note</>) : (<><Send className="mr-2 h-4 w-4" />Send Invitation</>)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

