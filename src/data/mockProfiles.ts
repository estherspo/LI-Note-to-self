
import type { Profile, Connection, ExperienceEntry } from '@/lib/types';

// Helper to parse old string format to new ExperienceEntry
const parseExperienceString = (expStr: string): ExperienceEntry => {
  const match = expStr.match(/(.*?) at (.*?)\s*\((.*?)\)/);
  if (match) {
    return {
      title: match[1].trim(),
      company: match[2].trim(),
      dates: match[3].trim(),
      responsibilities: [], // No responsibilities in old format
    };
  }
  // Fallback if parsing fails (should ideally not happen with current data)
  return { title: expStr, company: 'N/A', dates: 'N/A', responsibilities: [] };
};


export const mockProfiles: Profile[] = [
  {
    id: 'hunter-the-cat',
    name: 'Hunter The Cat',
    headline: 'Chief Vibe Officer (CVO) at MeowCorp',
    avatarUrl: 'https://images.unsplash.com/photo-1685271286659-c83faa4f5cb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpbmUlMjBjb29ufGVufDB8MnwwfHx8MA%3D%3D',
    dataAiHint: 'maine coon',
    company: 'MeowCorp',
    location: 'California, CA',
    bio: 'Experienced feline professional specializing in human morale boosting and late-night zoomies. Known for strong interpersonal skills (especially with houseplants and cardboard boxes) and a keen ability to detect the exact moment someone is about to sit down.',
    experience: [
      {
        title: 'Chief Vibe Officer',
        company: 'MeowCorp',
        dates: 'Jan 2025 – Present',
        responsibilities: [
          'Set the tone for household relaxation and general cozy ambiance.',
          'Expert in hallway monitoring.',
          'Actively involved in client engagement via welcoming sniffs and nudges.'
        ],
        location: 'Home Office'
      },
      parseExperienceString('Director of Napping at The Comfy Cushion (2021-2024)'),
    ],
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    headline: 'Product Manager at Future Gadgets Co.',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'man professional',
    company: 'Future Gadgets Co.',
    location: 'New York, NY',
    bio: 'Experienced Product Manager with a knack for user-centric design and market strategy. Avid reader and chess player.',
    experience: [
      parseExperienceString('Product Lead at Alpha Innovations (2019-2021)'),
      parseExperienceString('Associate PM at Beta Products (2017-2019)'),
    ],
  },
  {
    id: 'lucy-cray-cat',
    name: 'Lucy Cray The Cat',
    headline: 'Expert Biscuit Maker & Sunbeam Specialist',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'white fluffy cat',
    company: 'The Cozy Corner',
    location: 'New York',
    bio: 'Dedicated feline focusing on advanced napping techniques, enthusiastic bird watching, and the art of looking irresistibly cute. Always open to new chin scratch opportunities.',
    experience: [
      {
        title: 'Chief Relaxation Officer',
        company: 'The Sunny Spot',
        dates: '2022 – Present',
        responsibilities: [
          'Optimizing sunbeam usage for maximum warmth.',
          'Providing therapeutic purring services.',
          'Supervising human activity from elevated perches.'
        ],
        location: 'Living Room Window'
      },
      {
        title: 'Lead Dream Investigator',
        company: 'Nightly Adventures Inc.',
        dates: '2020 – 2022',
        responsibilities: [
          'Exploring alternate realities during sleep.',
          'Reporting findings via vigorous morning stretches.'
        ],
        location: 'Dreamland'
      },
    ],
  },
  {
    id: 'jack-cray-the-cat',
    name: 'Jack Cray The Cat',
    headline: 'VP of Nocturnal Operations at Zoomies United™',
    avatarUrl: 'https://images.unsplash.com/photo-1655056419284-c4f85449779c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFpbmVjb29uJTIwdGFiYnklMjBjYXR8ZW58MHx8MHx8fDA%3D',
    dataAiHint: 'maine coon tabby',
    company: 'Zoomies United™',
    location: 'New York',
    bio: 'Master of stealth, connoisseur of late-night sprints. Currently optimizing the house for maximum zoom potential and strategic toy deployment. Believes all floor space is a potential racetrack.',
    experience: [
      {
        title: 'VP of Nocturnal Operations',
        company: 'Zoomies United™',
        dates: '2024 - Present',
        responsibilities: ['Overseeing all after-dark household activities.', 'Strategic deployment of toys to trip humans.', 'Advanced stealth techniques for treat acquisition.', 'Leading the midnight choir practice.']
      },
      {
        title: 'Chief Pillow Inspector',
        company: 'The Comfy Den',
        dates: '2022-2024',
        responsibilities: ['Ensuring optimal fluffiness levels.', 'Conducting extensive napability tests on all soft surfaces.', 'Providing gravitational assistance to freshly laundered items.']
      },
    ],
  },
  {
    id: 'george-sweeney-the-cat',
    name: 'George Sweeney The Cat',
    headline: 'Executive Mealtime Coordinator at Food Logistics',
    avatarUrl: 'https://images.unsplash.com/photo-1547468137-1ad02f558bec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHV4ZWRvJTIwY2F0fGVufDB8fDB8fHww',
    dataAiHint: 'tuxedo cat',
    company: 'Food Logistics',
    location: 'California',
    bio: 'Passionate about timely meal delivery and rigorous quality control (taste testing is a non-negotiable part of the process). Believes every meal should be an event worth meowing about, ideally five times a day.',
    experience: [
      {
        title: 'Executive Mealtime Coordinator',
        company: 'Food Logistics',
        dates: '2023-Present',
        responsibilities: ['Synchronizing human activity with the precise feeding schedule.', 'Advanced treat negotiation tactics and lobbying for extra snacks.', 'Quality assurance of all incoming food items via enthusiastic sniffing.']
      },
      {
        title: 'Bowl Pre-Wash Technician',
        company: 'Kitchen Brigade Services',
        dates: '2021-2023',
        responsibilities: ['Ensuring no morsel goes to waste through diligent pre-cleaning.', 'Providing critical feedback on food quality and presentation, often vocally.', 'Advanced water bowl aeration specialist.']
      },
    ],
  },
  {
    id: 'salty-sears',
    name: 'Salty Sears The Cat',
    headline: 'Chief Yarn Officer at The Salty Paw',
    avatarUrl: 'https://images.unsplash.com/photo-1705147287233-c1fa8306d446?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGwlMjBicm93biUyMHRhYmJ5fGVufDB8fDB8fHww',
    dataAiHint: 'brown tabby cat',
    company: 'The Salty Paw',
    location: 'Washington, DC',
    bio: 'Navigating the high seas of napping and treat acquisition. Expert in purr-suasion and strategic pouncing. Believes every string is a challenge.',
    experience: [
      {
        title: 'Chief Yarn Officer (CYO)',
        company: 'The Salty Paw',
        dates: '2023 - Present',
        responsibilities: ['Managing all yarn-based assets.', 'Leading expeditions to uncharted territories (under the couch).', 'Developing new techniques for box occupation.']
      },
      {
        title: 'First Mate of Feather Wands',
        company: 'The Playful Pirate Ship',
        dates: '2021 - 2023',
        responsibilities: ['Ensuring all feather wands are thoroughly "tested".', 'Mastering the art of the surprise attack on unsuspecting ankles.']
      }
    ]
  }
];

export const getMockProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find(p => p.id === id);
};

// This ensures that when localStorage is cleared and the app initializes,
// Hunter The Cat starts with no connections. Consequently, profiles like
// Salty, Jack, and George will appear as new invitations on the
// /accept-request page as per its logic.
export const initialConnections: Connection[] = [];


    
