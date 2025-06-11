export interface Profile {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  company?: string;
  location?: string;
  bio?: string; // For AI prompt generation
  experience?: string[]; // For AI prompt generation
  education?: string[]; // For AI prompt generation
  dataAiHint?: string; // For placeholder image search keywords
}

export interface Connection extends Profile {
  privateNote?: string;
  connectionDate?: string; // ISO date string
  standardMessage?: string; // Optional message sent with connection request
}
