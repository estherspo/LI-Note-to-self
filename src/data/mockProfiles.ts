
import type { Profile, Connection } from '@/lib/types';

export const mockProfiles: Profile[] = [
  {
    id: 'jane-doe',
    name: 'Hunter The Cat',
    headline: 'Chief Vibe Officer (CVO)  at MeowCorp',
    avatarUrl: 'https://placehold.co/128x128.png', 
    dataAiHint: 'tabby cat',
    company: 'MeowCorp',
    location: 'California, CA',
    bio: 'Experienced feline professional specializing in human morale boosting and late-night zoomies. Known for strong interpersonal skills (especially with houseplants and cardboard boxes) and a keen ability to detect the exact moment someone is about to sit down.',
    experience: ['Chief Napping Officer at The Comfy Cushion (2021-Present)', 'Lead Playtime Innovator at String Theory Inc. (2019-2021)'],
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
    experience: ['Product Lead at Alpha Innovations (2019-2021)', 'Associate PM at Beta Products (2017-2019)'],
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
    experience: ['Lead UX Designer at PixelPerfect Agency (2020-Present)', 'UI/UX Designer at MobileFirst Apps (2018-2020)'],
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
    experience: ['Senior Data Scientist at Insightful Analytics (2019-Present)', 'Data Analyst at Quant Solutions (2017-2019)'],
  }
];

export const getMockProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find(p => p.id === id);
};


export const initialConnections: Connection[] = [
  {
    ...mockProfiles[1], // John Smith
    id: 'conn-john-smith', // Ensure connection ID is unique if needed for list keys
    privateNote: "Met John at the 2023 Tech Conference. Discussed potential collaboration on product strategy.",
    connectionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    standardMessage: "Hi John, enjoyed your talk at the conference. Would love to connect!",
  },
  {
    ...mockProfiles[2], // Alice Green
    id: 'conn-alice-green',
    privateNote: "Alice is a talented UX designer. We worked together on the MobileFirst project.",
    connectionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
];
