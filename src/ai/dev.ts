import { config } from 'dotenv';
config();

import '@/ai/flows/generate-note-prompts.ts';
import '@/ai/flows/summarize-connection-history.ts';