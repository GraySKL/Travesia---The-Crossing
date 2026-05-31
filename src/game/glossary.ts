// Vocabulary helpers. Words the player encounters (by revealing a gloss) or
// earns (via a `learn` effect) accumulate into a personal list, deduped by the
// Spanish term.

import type { VocabItem } from './types';

export function addVocab(list: VocabItem[], item: VocabItem): VocabItem[] {
  const key = item.es.trim().toLowerCase();
  if (list.some((v) => v.es.trim().toLowerCase() === key)) return list;
  return [...list, item];
}
