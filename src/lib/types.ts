
export interface ExperienceEntry {
  title: string;
  company: string;
  dates: string;
  responsibilities?: string[];
  location?: string; // Optional field
}

export interface Profile {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  company?: string;
  location?: string;
  bio?: string; // For AI prompt generation
  experience?: ExperienceEntry[]; // Updated from string[]
  dataAiHint?: string; // For placeholder image search keywords
}

export interface Connection extends Profile {
  privateNote?: string;
  connectionDate?: string; // ISO date string
  standardMessage?: string; // Optional message sent with connection request
}

// Moved from accept-request/page.tsx for better reusability
export interface PendingInvitation extends Profile {
  message?: string;
  mutualConnectionsText?: string;
  isVerified?: boolean;
  showLinkedInIcon?: boolean;
  showLinkedInPremiumIcon?: boolean;
}
