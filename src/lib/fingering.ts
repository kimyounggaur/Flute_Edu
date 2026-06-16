import { NOTES } from "../data/notes";
import type { Fingering, FluteNote, KeyId } from "../data/types";
import { KEY_ORDER } from "./music";

export interface FingeringMatch {
  note: FluteNote;
  fingering: Fingering;
  fingeringIndex: number;
}

export function keySignature(keys: KeyId[]) {
  const unique = new Set(keys);
  return KEY_ORDER.filter((key) => unique.has(key)).join("|");
}

export function sameKeySet(left: KeyId[], right: KeyId[]) {
  return keySignature(left) === keySignature(right);
}

export function findMatchingFingerings(keys: KeyId[]): FingeringMatch[] {
  const target = keySignature(keys);
  if (!target) return [];

  return NOTES.flatMap((note) =>
    note.fingerings
      .map((fingering, fingeringIndex) => ({ note, fingering, fingeringIndex }))
      .filter((match) => keySignature(match.fingering.keys) === target),
  );
}
