
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Connection } from '@/lib/types';
import { useConnections } from '@/hooks/useConnections';
import { useToast } from '@/hooks/use-toast';
import { Save, SkipForward, Loader2 } from 'lucide-react';

interface PostAcceptNoteDialogProps {
  connection: Connection | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_PRIVATE_NOTE_LENGTH = 500;

export function PostAcceptNoteDialog({ connection, isOpen, onOpenChange }: PostAcceptNoteDialogProps) {
  const { updateConnectionNote } = useConnections();
  const [privateNote, setPrivateNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && connection) {
      setPrivateNote(connection.privateNote || ''); // Initialize with existing note or empty
    }
  }, [isOpen, connection]);

  if (!connection) return null;

  const handleSaveNote = async () => {
    if (privateNote.length > MAX_PRIVATE_NOTE_LENGTH) {
      toast({
        title: "Note too long",
        description: `Your private note exceeds the ${MAX_PRIVATE_NOTE_LENGTH} character limit.`,
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    try {
      updateConnectionNote(connection.id, privateNote);
      toast({
        title: "Private Note Saved",
        description: `Your private note for ${connection.name} has been saved.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not save private note.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  const characterCountPrivate = privateNote.length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-headline">
            Add a private note for {connection.name}?
          </DialogTitle>
          <DialogDescription>
            Only you will see this note. You can always add or edit it later from your network.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <div className="space-y-1.5">
            <Label htmlFor="privateNotePostAccept">Private Note</Label>
            <Textarea
              id="privateNotePostAccept"
              placeholder="e.g., Met at CatCon, discussed tuna snacks, potential playdate..."
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
          <Button type="button" variant="outline" onClick={handleSkip} disabled={isSaving}>
            <SkipForward className="mr-2 h-4 w-4" />
            Skip
          </Button>
          <Button 
            type="submit" 
            onClick={handleSaveNote} 
            disabled={isSaving || characterCountPrivate > MAX_PRIVATE_NOTE_LENGTH}
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
