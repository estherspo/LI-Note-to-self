
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
    id: 'jane-doe',
    name: 'Hunter The Cat',
    headline: 'Chief Vibe Officer (CVO) at MeowCorp',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'tabby cat',
    company: 'MeowCorp',
    location: 'California, CA',
    bio: 'Experienced feline professional specializing in human morale boosting and late-night zoomies. Known for strong interpersonal skills (especially with houseplants and cardboard boxes) and a keen ability to detect the exact moment someone is about to sit down.',
    experience: [
      {
        title: 'Chief Vibe Officer',
        company: 'MeowCorp',
        dates: 'Jan 2025 – Present', // Future date for fun
        responsibilities: [
          'Set the tone for household relaxation and general cozy ambiance.',
          'Expert in hallway monitoring.',
          'Actively involved in client engagement via welcoming sniffs and nudges.'
        ],
        location: 'Home Office'
      },
      parseExperienceString('Chief Napping Officer at The Comfy Cushion (2021-2024)'),
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
    id: 'alice-green',
    name: 'Alice Green',
    headline: 'UX Designer at CreativeMinds Studio',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'designer thinking',
    company: 'CreativeMinds Studio',
    location: 'Austin, TX',
    bio: 'Crafting delightful user experiences through empathy and design thinking. Enjoys painting and travel.',
    experience: [
      parseExperienceString('Lead UX Designer at PixelPerfect Agency (2020-Present)'),
      parseExperienceString('UI/UX Designer at MobileFirst Apps (2018-2020)'),
    ],
  },
  {
    id: 'bob-brown',
    name: 'Bob Brown',
    headline: 'Data Scientist at AnalyzeData Corp',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'scientist glasses',
    company: 'AnalyzeData Corp',
    location: 'Chicago, IL',
    bio: 'Transforming data into actionable insights. Expertise in machine learning and statistical modeling. Loves board games.',
    experience: [
      parseExperienceString('Senior Data Scientist at Insightful Analytics (2019-Present)'),
      parseExperienceString('Data Analyst at Quant Solutions (2017-2019)'),
    ],
  }
];

export const getMockProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find(p => p.id === id);
};


export const initialConnections: Connection[] = [
  {
    ...mockProfiles[1], // John Smith
    id: 'conn-john-smith', 
    privateNote: "Met John at the 2023 Tech Conference. Discussed potential collaboration on product strategy.",
    connectionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), 
    standardMessage: "Hi John, enjoyed your talk at the conference. Would love to connect!",
  },
  {
    ...mockProfiles[2], // Alice Green
    id: 'conn-alice-green',
    privateNote: "Alice is a talented UX designer. We worked together on the MobileFirst project.",
    connectionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), 
  },
];

