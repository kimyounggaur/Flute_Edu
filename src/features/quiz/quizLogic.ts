import type { FluteNote } from "../../data/types";
import { prettyNoteName, solfegeFixed } from "../../lib/music";

export type QuizType = "fingering-to-name" | "name-to-fingering" | "staff-to-name";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  note: FluteNote;
  prompt: string;
  answer: string;
  choices: string[];
}

interface CreateQuizQuestionInput {
  type: QuizType;
  notes: FluteNote[];
  seed?: number;
}

interface ScoreQuizAnswerInput {
  answer: string;
  selected: string;
  streak: number;
  misses: string[];
}

function seededIndex(seed: number, length: number) {
  const x = Math.sin(seed * 999) * 10000;
  return Math.abs(Math.floor(x)) % length;
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

export function createQuizQuestion({ type, notes, seed = Date.now() }: CreateQuizQuestionInput): QuizQuestion {
  if (notes.length < 4) {
    throw new Error("At least four notes are required to create a quiz question.");
  }
  const note = notes[seededIndex(seed, notes.length)];
  const answer = prettyNoteName(note);
  const distractors = notes
    .filter((candidate) => candidate.id !== note.id)
    .slice()
    .sort((a, b) => Math.abs(a.midi - note.midi) - Math.abs(b.midi - note.midi))
    .map(prettyNoteName);
  const choices = unique([answer, ...distractors]).slice(0, 4);
  while (choices.length < 4) {
    choices.push(prettyNoteName(notes[seededIndex(seed + choices.length, notes.length)]));
  }

  const promptByType: Record<QuizType, string> = {
    "fingering-to-name": "이 운지의 음 이름은 무엇일까요?",
    "name-to-fingering": `${prettyNoteName(note)} · ${solfegeFixed(note.letter, note.accidental)} 운지를 고르세요.`,
    "staff-to-name": "오선보의 음 이름을 고르세요.",
  };

  return {
    id: `${type}-${note.id}-${seed}`,
    type,
    note,
    prompt: promptByType[type],
    answer,
    choices,
  };
}

export function scoreQuizAnswer({ answer, selected, streak, misses }: ScoreQuizAnswerInput) {
  const isCorrect = answer === selected;
  return {
    isCorrect,
    streak: isCorrect ? streak + 1 : 0,
    misses: isCorrect ? misses : [...misses, answer],
  };
}

export function summarizeQuizSession({ total, correct, misses }: { total: number; correct: number; misses: string[] }) {
  return {
    total,
    correct,
    accuracy: total === 0 ? 0 : Math.round((correct / total) * 100),
    reviewIds: unique(misses),
  };
}
