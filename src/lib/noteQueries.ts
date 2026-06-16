import type { FluteNote, LetterName, Register } from "../data/types";
import { buildAliases, normalizeSearch, prettyNoteName, solfegeFixed, solfegeMovable } from "./music";

export function findNoteById(notes: FluteNote[], id: string) {
  return notes.find((note) => note.id === id) ?? notes[0];
}

export function notesByRegister(notes: FluteNote[], register: Register) {
  return notes.filter((note) => note.register === register);
}

export function searchNotes(notes: FluteNote[], query: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  return notes.filter((note) => buildAliases(note).some((alias) => normalizeSearch(alias).includes(normalized)));
}

export function displayNote(note: FluteNote, mode: "note" | "solfege" | "both", solfegeMode: "fixed" | "movable", selectedKey: LetterName) {
  const noteName = prettyNoteName(note);
  const solfege = solfegeMode === "fixed" ? solfegeFixed(note.letter, note.accidental) : solfegeMovable(note, selectedKey);
  if (mode === "note") return noteName;
  if (mode === "solfege") return `${solfege}${note.octave}`;
  return `${solfege}${note.octave} · ${noteName}`;
}

export function registerLabel(register: Register) {
  return register === 1 ? "저음역" : register === 2 ? "중음역" : "고음역";
}
