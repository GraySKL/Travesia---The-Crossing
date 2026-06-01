// Typed story model for Travesía. Story content is authored as data against
// these types; the runtime (engine.ts) interprets them. Keeping the story as
// data (not code) makes it portable and easy to vet.

export type SceneId = string;

export interface VocabItem {
  /** The Spanish word or phrase. */
  es: string;
  /** Its English meaning. */
  en: string;
  /** Optional pronunciation or usage note. */
  note?: string;
}

/** A run of narrative text: either plain English, or a Spanish term to gloss. */
export type Segment =
  | { en: string }
  | { es: string; gloss: string; note?: string };

export interface Line {
  /** Optional speaker label (e.g., a character's name). */
  speaker?: string;
  segments: Segment[];
  /**
   * Optional pre-recorded voice clip id(s) for this line, played in order
   * (a line spoken by two voices — e.g. a character then the narrator — uses
   * two ids). Resolves to /audio/<chapterId>/<id>.mp3. Missing clips fall back
   * to text-to-speech.
   */
  audio?: string[];
}

export type Effect =
  | { type: 'flag'; name: string; value?: boolean }
  | { type: 'learn'; vocab: VocabItem };

export interface Choice {
  /** Choice text, in Spanish. */
  es: string;
  /** English meaning, revealed on demand. */
  gloss?: string;
  next: SceneId;
  effects?: Effect[];
  /** Optional flag name that must be set for this choice to appear. */
  requires?: string;
  /** Optional pronunciation-model clip id for this choice. */
  audio?: string;
}

/** A mood tints the scene's backdrop. Purely atmospheric. */
export type Mood = 'dawn' | 'warm' | 'tense' | 'cold' | 'night' | 'hope';

export interface Scene {
  id: SceneId;
  mood?: Mood;
  lines: Line[];
  onEnter?: Effect[];
  /** Branching choices. If present, they take precedence over `next`. */
  choices?: Choice[];
  /** Linear continuation when there are no choices. */
  next?: SceneId;
  /** Marks a chapter ending. */
  end?: boolean;
  /** Reflective text shown at an ending. */
  endNote?: string;
  /** Optional looping ambient bed id for this scene (/audio/ambient/<id>.mp3). */
  ambient?: string;
  /** Optional pre-recorded clip id(s) for the ending reflection. */
  endNoteAudio?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  intro?: string;
  startScene: SceneId;
  /** Citations for every factual claim in this chapter. Vetted by story-vet. */
  sources: string[];
  scenes: Record<SceneId, Scene>;
  /** Id of the chapter that follows this one; offered as "continue" at endings. */
  nextChapter?: string;
}
