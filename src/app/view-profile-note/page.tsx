
// src/app/view-profile-note/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Linkedin, Users, X, StickyNote, Edit3, CheckCircle2 } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MAX_NOTE_LENGTH = 500;
const defaultInitialNoteText = "Lucy's little brother. Never met the kid.";

export default function ViewProfileNotePage() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true); 
  const profileName = "Jack The Cat"; // Updated from Hunter The Cat
  const profileLinkedInDisplayText = "linkedin.com/in/jack-the-cat"; // Updated display text
  const profileActualLinkUrl = "https://www.instagram.com/hunter_spo?igsh=NTc4MTIwNjQ2YQ=="; // Kept as is, can be updated in a follow-up if needed
  const connectionDate = "June 11, 2025";

  const [noteToSelf, setNoteToSelf] = useState(defaultInitialNoteText);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editedNoteText, setEditedNoteText] = useState(defaultInitialNoteText);
  const { toast } = useToast();

  useEffect(() => {
    // If dialog is closed by any means (onOpenChange), navigate to Jack The Cat's profile page
    if (!isDialogOpen) {
      router.push('/invite/jack-cray-the-cat');
    }
  }, [isDialogOpen, router]);

  useEffect(() => { 
    setNoteToSelf(defaultInitialNoteText);
    setEditedNoteText(defaultInitialNoteText);
  }, []);


  const premiumUserAvatars = [
    { src: "https://placehold.co/24x24.png", alt: "User 1", dataAiHint: "person avatar" },
    { src: "https://placehold.co/24x24.png", alt: "User 2", dataAiHint: "person avatar" },
    { src: "https://placehold.co/24x24.png", alt: "User 3", dataAiHint: "person avatar" },
  ];

  const handleEditNote = () => {
    setEditedNoteText(noteToSelf); 
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    if (editedNoteText.length > MAX_NOTE_LENGTH) {
      toast({
        title: "Note Too Long",
        description: `Your note cannot exceed ${MAX_NOTE_LENGTH} characters.`,
        variant: "destructive",
      });
      return;
    }
    setNoteToSelf(editedNoteText);
    setIsEditingNote(false);
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          <span>Note to self saved</span>
        </div>
      ),
    });
  };

  const handleCancelEdit = () => {
    setEditedNoteText(noteToSelf); 
    setIsEditingNote(false);
  };

  const characterCount = editedNoteText.length;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md"> 
        <DialogHeader className="flex flex-col items-start pr-6"> 
          <DialogTitle className="font-headline text-xl font-semibold">{profileName}</DialogTitle>
          <hr className="w-full border-primary my-2" />
        </DialogHeader>
        
        <div className="space-y-6 pt-2 pb-6 max-h-[56vh] overflow-y-auto pr-3 pl-1">
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Linkedin className="h-6 w-6 text-foreground/80 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{profileName}'s Profile</p>
                  <Link href={profileActualLinkUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {profileLinkedInDisplayText}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-foreground/80 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Connected</p>
                  <p className="text-sm text-foreground/80">{connectionDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pt-2">
                <StickyNote className="h-6 w-6 text-foreground/80 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-foreground">Note to self</p>
                    {!isEditingNote && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={handleEditNote}>
                        <Edit3 className="h-4 w-4" />
                        <span className="sr-only">Edit note</span>
                      </Button>
                    )}
                  </div>
                  {isEditingNote ? (
                    <div className="space-y-2">
                      <Textarea
                        id="noteToSelfViewProfile"
                        placeholder="e.g., Met at CatCon, discussed tuna snacks..."
                        value={editedNoteText}
                        onChange={(e) => setEditedNoteText(e.target.value)}
                        maxLength={MAX_NOTE_LENGTH + 20} 
                        className="min-h-[100px] border-input text-sm"
                      />
                      <div className={`text-xs ${characterCount > MAX_NOTE_LENGTH ? 'text-destructive' : 'text-foreground/70'}`}>
                        {characterCount}/{MAX_NOTE_LENGTH} characters
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                           Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveNote} disabled={characterCount > MAX_NOTE_LENGTH || characterCount === 0}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{noteToSelf || "No note added yet."}</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          <hr className="border-border" />

          <div>
            <h4 className="text-md font-semibold mb-1">Get up to 4.6x replies when you message with InMail</h4>
            <p className="text-sm text-foreground/80 mb-3">
              Message {profileName.split(' ')[0]} with InMail credits and write your own message or generate a message draft with the help of AI.
            </p>
            <div className="flex items-center mb-3">
              <div className="flex -space-x-2 mr-2">
                {premiumUserAvatars.map((avatar, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={avatar.src} alt={avatar.alt} data-ai-hint={avatar.dataAiHint}/>
                    <AvatarFallback>{avatar.alt.substring(0,1)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-xs text-foreground/80">Sonia and millions of other members use Premium</p>
            </div>
            <Button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-full h-9 px-3">
              Reactivate Premium
            </Button>
            <p className="text-xs text-foreground/80 text-center mt-2">Cancel anytime. No hidden fees.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

