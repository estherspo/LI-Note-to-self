"use client";

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useConnections } from '@/hooks/useConnections';
import { useToast } from '@/hooks/use-toast';
import { Edit3, Trash2, Save, X, StickyNote } from 'lucide-react';
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

interface PrivateNoteSectionProps {
  connectionId: string;
  initialNote?: string;
  isEditingInitially?: boolean;
  onEditToggle?: (isEditing: boolean) => void;
}

const MAX_NOTE_LENGTH = 500;

export function PrivateNoteSection({ connectionId, initialNote, isEditingInitially = false, onEditToggle }: PrivateNoteSectionProps) {
  const [noteText, setNoteText] = useState(initialNote || '');
  const [isEditing, setIsEditing] = useState(isEditingInitially || !initialNote);
  const { updateConnectionNote, deleteConnectionNote: hookDeleteNote } = useConnections();
  const { toast } = useToast();

  useEffect(() => {
    setNoteText(initialNote || '');
    setIsEditing(isEditingInitially || !initialNote);
  }, [initialNote, isEditingInitially]);
  
  useEffect(() => {
    onEditToggle?.(isEditing);
  }, [isEditing, onEditToggle]);

  const handleSaveNote = async () => {
    if (noteText.length > MAX_NOTE_LENGTH) {
      toast({
        title: "Note too long",
        description: `Your note exceeds the ${MAX_NOTE_LENGTH} character limit.`,
        variant: "destructive",
      });
      return;
    }
    updateConnectionNote(connectionId, noteText);
    toast({
      title: "Note Saved",
      description: "Your private note has been successfully saved.",
    });
    setIsEditing(false);
  };

  const handleDeleteNote = async () => {
    hookDeleteNote(connectionId);
    setNoteText('');
    toast({
      title: "Note Deleted",
      description: "Your private note has been deleted.",
    });
    setIsEditing(true); // Allow adding a new note
  };

  const handleCancelEdit = () => {
    setNoteText(initialNote || '');
    setIsEditing(false);
  }

  const characterCount = noteText.length;

  if (!isEditing && !noteText) {
    return (
      <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full">
        <StickyNote className="mr-2 h-4 w-4" /> Add a private note
      </Button>
    );
  }
  
  if (isEditing) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-md flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            {initialNote ? 'Edit Private Note' : 'Add Private Note'}
          </CardTitle>
          <CardDescription>Only you can see this note.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Remember how you know them, key discussion points, follow-up actions..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            maxLength={MAX_NOTE_LENGTH}
            className="min-h-[100px]"
          />
          <div className={`text-sm ${characterCount > MAX_NOTE_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}>
            {characterCount}/{MAX_NOTE_LENGTH} characters
          </div>
          <div className="flex justify-end gap-2">
            {initialNote && (
                 <Button variant="ghost" onClick={handleCancelEdit} size="sm">
                    <X className="mr-1 h-4 w-4" /> Cancel
                </Button>
            )}
            <Button onClick={handleSaveNote} size="sm" disabled={characterCount > MAX_NOTE_LENGTH}>
              <Save className="mr-1 h-4 w-4" /> Save Note
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="private-note">
        <AccordionTrigger className="hover:no-underline text-left">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            <span className="font-medium">Private Note</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <div className="p-4 bg-muted/50 rounded-md space-y-3">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{noteText || "No note added yet."}</p>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="mr-1 h-4 w-4" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={!noteText}>
                    <Trash2 className="mr-1 h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your private note for this connection. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteNote} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Delete Note</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
