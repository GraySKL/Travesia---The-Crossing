import type { Chapter } from '../../game/types';
import { chapterArrival } from './chapter-01-arrival';

// Chapter registry. Order here is play order on the title screen.
export const chapters: Chapter[] = [chapterArrival];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
