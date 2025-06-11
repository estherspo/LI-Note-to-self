
// src/app/view-profile-note/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Linkedin, Users, X, StickyNote, Edit3, Save, MessageSquare } from "lucide-react"; 

const MAX_NOTE_LENGTH = 500;

export default function ViewProfileNotePage() {
  const profileName = "Hunter The Cat";
  const profileLinkedInUrl = "linkedin.com/in/hunter-the-cat-cvo";
  const connectionDate = "Jan 15, 2024";
  const initialNoteToSelfText = "Met at CatCon 2024. Loves tuna snacks. Potential playdate for next week. Follow up on the laser pointer recommendation.";

  const [noteToSelf, setNoteToSelf] = useState(initialNoteToSelfText);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editedNoteText, setEditedNoteText] = useState(initialNoteToSelfText);


  // Placeholder for multiple avatars
  const premiumUserAvatars = [
    { src: "https://placehold.co/24x24.png", alt: "User 1", dataAiHint: "person avatar" },
    { src: "https://placehold.co/24x24.png", alt: "User 2", dataAiHint: "person avatar" },
    { src: "https://placehold.co/24x24.png", alt: "User 3", dataAiHint: "person avatar" },
  ];

  const handleEditNote = () => {
    setEditedNoteText(noteToSelf); // Start editing with current note
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    if (editedNoteText.length > MAX_NOTE_LENGTH) {
      // Basic validation, could add a toast here
      alert(`Note cannot exceed ${MAX_NOTE_LENGTH} characters.`);
      return;
    }
    setNoteToSelf(editedNoteText);
    setIsEditingNote(false);
  };

  const handleCancelEdit = () => {
    // No reset to original, just exit editing mode. editedNoteText keeps its value if not saved.
    setIsEditingNote(false);
  };

  const characterCount = editedNoteText.length;


  return (
    <div className="container mx-auto px-0 sm:px-4 py-8 flex justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="font-headline text-xl font-semibold">{profileName}</CardTitle>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50 h-8 w-8" onClick={() => console.log("Close clicked (visual only)")}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Linkedin className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{profileName}'s Profile</p>
                  <Link href={`https://${profileLinkedInUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {profileLinkedInUrl}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Connected</p>
                  <p className="text-sm text-muted-foreground">{connectionDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pt-2">
                <StickyNote className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
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
                        maxLength={MAX_NOTE_LENGTH}
                        className="min-h-[100px] border-input text-sm"
                      />
                      <div className={`text-xs ${characterCount > MAX_NOTE_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {characterCount}/{MAX_NOTE_LENGTH} characters
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                           Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveNote} disabled={characterCount > MAX_NOTE_LENGTH}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{noteToSelf || "No note added yet."}</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          <hr className="border-border" />

          <div>
            <h4 className="text-md font-semibold mb-1">Get up to 4.6x replies when you message with InMail</h4>
            <p className="text-sm text-muted-foreground mb-3">
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
              <p className="text-xs text-muted-foreground">Sonia and millions of other members use Premium</p>
            </div>
            <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-full h-9">
              Reactivate Premium
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">Cancel anytime. No hidden fees.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
