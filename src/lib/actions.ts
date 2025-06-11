
"use server";

import { generateNotePrompts as aiGenerateNotePrompts } from '@/ai/flows/generate-note-prompts';
import type { Profile, ExperienceEntry } from './types';

// This is a mock/stub for actual database operations or API calls.
// In a real app, this would interact with a database.
// For now, it will primarily be illustrative and rely on client-side state management.

export async function handleGenerateNotePrompts(profile: Profile): Promise<string[]> {
  try {
    let experienceString = '';
    if (profile.experience && profile.experience.length > 0) {
      experienceString = 'Experience: ' + profile.experience.map(exp => {
        let entryStr = `${exp.title} at ${exp.company} (${exp.dates})`;
        if (exp.location) {
          entryStr += ` located in ${exp.location}`;
        }
        if (exp.responsibilities && exp.responsibilities.length > 0) {
          entryStr += `. Responsibilities included: ${exp.responsibilities.join(', ')}`;
        }
        return entryStr;
      }).join('; Next role: ') + '.';
    }

    const profileDataString = `Name: ${profile.name}. Headline: ${profile.headline}. ${profile.company ? 'Current Company: ' + profile.company + '.' : ''} ${profile.location ? 'Location: ' + profile.location + '.' : ''} ${profile.bio ? 'Bio: ' + profile.bio + '.' : ''} ${experienceString}`;
    
    const result = await aiGenerateNotePrompts({ profileData: profileDataString.trim() });
    return result.prompts;
  } catch (error) {
    console.error("Error generating note prompts:", error);
    // Return some fallback prompts or an empty array
    return [
      "Mention a shared connection or interest.",
      "Comment on a recent post or achievement.",
      "Explain why you'd like to connect."
    ];
  }
}

// Simulated actions for saving/deleting notes.
// In a real application, these would interact with a database.
// The useConnections hook will handle actual localStorage persistence for this demo.

export async function saveConnectionNote(connectionId: string, note: string, standardMessage?: string): Promise<{ success: boolean; message: string }> {
  // Simulate saving to a backend
  console.log(`Server Action: Saving note for ${connectionId}: "${note}". Standard message: "${standardMessage}"`);
  // In a real app, you'd update the database here.
  // For this demo, the client-side hook handles localStorage.
  // This action primarily demonstrates the server action pattern.
  return { success: true, message: "Note saved successfully (simulated)." };
}

export async function deleteConnectionNote(connectionId: string): Promise<{ success: boolean; message: string }> {
  // Simulate deleting from a backend
  console.log(`Server Action: Deleting note for ${connectionId}`);
  return { success: true, message: "Note deleted successfully (simulated)." };
}
