import type { Chapter } from '../game/types';
import { chapterArrival } from './chapter-01-arrival';
import { chapterWork } from './chapter-02-work';
import { chapterStay } from './chapter-03-the-ones-who-stay';

// Chapter registry. Order here is play order on the title screen.
export const chapters: Chapter[] = [chapterArrival, chapterWork, chapterStay];
