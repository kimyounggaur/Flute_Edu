import type { Accidental, FluteNote, KeyId, LetterName, Register } from "../data/types";
import { freqOf as midiToFrequency } from "../data/types";

export const freqOf = midiToFrequency;

export const KEY_ORDER: KeyId[] = [
  "thumbBb",
  "thumbB",
  "lh1",
  "lh2",
  "lh3",
  "gs",
  "rh1",
  "rh2",
  "rh3",
  "dTrill",
  "dSharpTrill",
  "eb",
  "csFoot",
  "cFoot",
  "bFoot",
  "gizmo",
];

export const KEY_LABEL: Record<KeyId, string> = {
  thumbBb: "왼손 엄지로 B♭ 레버",
  thumbB: "왼손 엄지로 B 키",
  lh1: "왼손 검지",
  lh2: "왼손 중지",
  lh3: "왼손 약지",
  gs: "왼손 새끼로 G♯ 키",
  rh1: "오른손 검지",
  rh2: "오른손 중지",
  rh3: "오른손 약지",
  dTrill: "D 트릴 키",
  dSharpTrill: "D♯ 트릴 키",
  eb: "오른손 새끼로 E♭ 키",
  csFoot: "오른손 새끼로 저음 C♯ 풋키",
  cFoot: "오른손 새끼로 저음 C 풋키",
  bFoot: "오른손 새끼로 저음 B 풋키",
  gizmo: "오른손 새끼로 기즈모 키",
};

export const KEY_TOKEN: Record<KeyId, string> = {
  thumbBb: "B♭T",
  thumbB: "T",
  lh1: "1",
  lh2: "2",
  lh3: "3",
  gs: "G#",
  rh1: "1",
  rh2: "2",
  rh3: "3",
  dTrill: "D",
  dSharpTrill: "D#",
  eb: "Eb",
  csFoot: "C#",
  cFoot: "C",
  bFoot: "B",
  gizmo: "Gz",
};

export const SOLFEGE: Record<LetterName, string> = {
  C: "도",
  D: "레",
  E: "미",
  F: "파",
  G: "솔",
  A: "라",
  B: "시",
};

const ROMA: Record<string, string> = {
  도: "do",
  레: "re",
  미: "mi",
  파: "fa",
  솔: "sol",
  라: "la",
  시: "si",
};

const HANGUL_LETTER: Record<LetterName, string> = {
  C: "다",
  D: "라",
  E: "마",
  F: "바",
  G: "사",
  A: "가",
  B: "나",
};

const PITCH_CLASS: Record<LetterName, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

const MOVABLE_SOLFEGE = ["도", "올림도", "레", "내림미", "미", "파", "올림파", "솔", "올림솔", "라", "내림시", "시"];

export const octaveTips: Record<Register, string[]> = {
  1: ["바람을 낮고 넓게 보냅니다.", "입술 구멍을 너무 작게 조이지 않습니다.", "소리가 한 옥타브 위로 튀면 바람이 너무 빠른지 확인합니다."],
  2: ["저음보다 바람의 중심을 조금 더 모읍니다.", "손가락보다 소리 시작이 먼저 흔들리지 않게 천천히 연습합니다.", "혀로 '투/두' 하며 부드럽게 음을 시작합니다."],
  3: ["바람 속도를 올리되 목·어깨는 힘을 뺍니다.", "입술을 과하게 누르지 말고 작은 구멍으로 빠른 바람을 만듭니다.", "고음은 짧게 시도하고, 정확한 운지·바람 방향을 선생님과 확인하면 좋습니다."],
};

export function keysToSteps(keys: KeyId[]) {
  return KEY_ORDER.filter((key) => keys.includes(key)).map((key) => `${KEY_LABEL[key]}를 누릅니다.`);
}

export function keysToToken(keys: KeyId[]) {
  const has = (key: KeyId) => keys.includes(key);
  const thumb = has("thumbBb") ? "B♭T" : has("thumbB") ? "T" : "";
  const left = (["lh1", "lh2", "lh3"] as KeyId[]).map((key) => (has(key) ? KEY_TOKEN[key] : "-")).join("") + (has("gs") ? "G#" : "");
  const right = (["rh1", "rh2", "rh3"] as KeyId[]).map((key) => (has(key) ? KEY_TOKEN[key] : "-")).join("");
  const extra = (["dTrill", "dSharpTrill", "eb", "csFoot", "cFoot", "bFoot", "gizmo"] as KeyId[])
    .filter((key) => has(key))
    .map((key) => KEY_TOKEN[key])
    .join("");
  return `${thumb} ${left} | ${right}${extra}`.replace(/\s+/g, " ").trim();
}

export function solfegeFixed(letter: LetterName | string, acc?: Accidental) {
  const base = SOLFEGE[letter as LetterName] ?? letter;
  if (!acc) return base;
  return acc === "sharp" ? `올림${base}(${base}♯)` : `내림${base}(${base}♭)`;
}

export function notePitchClass(note: Pick<FluteNote, "letter" | "accidental">) {
  const offset = note.accidental === "sharp" ? 1 : note.accidental === "flat" ? -1 : 0;
  return (PITCH_CLASS[note.letter] + offset + 12) % 12;
}

export function solfegeMovable(note: Pick<FluteNote, "letter" | "accidental">, key: LetterName) {
  const interval = (notePitchClass(note) - PITCH_CLASS[key] + 12) % 12;
  return MOVABLE_SOLFEGE[interval];
}

export function noteDisplayName(note: Pick<FluteNote, "letter" | "accidental" | "octave">) {
  const acc = note.accidental === "sharp" ? "#" : note.accidental === "flat" ? "b" : "";
  return `${note.letter}${acc}${note.octave}`;
}

export function prettyNoteName(note: Pick<FluteNote, "letter" | "accidental" | "octave">) {
  const acc = note.accidental === "sharp" ? "♯" : note.accidental === "flat" ? "♭" : "";
  return `${note.letter}${acc}${note.octave}`;
}

export function solfegeWithOctave(note: Pick<FluteNote, "letter" | "accidental" | "octave">, mode: "fixed" | "movable" = "fixed", key: LetterName = "C") {
  const name = mode === "fixed" ? solfegeFixed(note.letter, note.accidental) : solfegeMovable(note, key);
  return `${name}${note.octave}`;
}

export function normalizeSearch(input: string) {
  return input
    .trim()
    .replace(/\s+/g, "")
    .replace(/flat|플랫|♭/gi, "b")
    .replace(/sharp|샵|♯/gi, "#")
    .replace(/내림/g, "b")
    .replace(/올림/g, "#")
    .toLowerCase();
}

function accidentalMarks(acc?: string) {
  if (acc === "sharp") return { symbol: "♯", ascii: "#" };
  if (acc === "flat") return { symbol: "♭", ascii: "b" };
  return { symbol: "", ascii: "" };
}

function addNoteAliases(out: Set<string>, letter: LetterName, accidental: "" | "#" | "b", octave?: number) {
  const sol = SOLFEGE[letter];
  const hangul = HANGUL_LETTER[letter];
  const suffix = octave === undefined ? "" : String(octave);
  const symbol = accidental === "#" ? "♯" : accidental === "b" ? "♭" : "";
  for (const alias of [
    `${letter}${accidental}${suffix}`,
    `${letter}${symbol}${suffix}`,
    `${letter}${accidental}`.toLowerCase() + suffix,
    `${sol}${symbol}${suffix}`,
    `${sol}${accidental}${suffix}`,
    `${ROMA[sol]}${accidental}${suffix}`,
    `${hangul}${symbol}${suffix}`,
    `${hangul}${accidental}${suffix}`,
  ]) {
    if (alias) out.add(alias);
  }
}

function parseNoteName(id: string) {
  const match = /^([A-G])([#b♯♭]?)(\d?)$/.exec(id);
  if (!match) return undefined;
  return {
    letter: match[1] as LetterName,
    accidental: match[2] === "#" || match[2] === "♯" ? "#" : match[2] === "b" || match[2] === "♭" ? "b" : "",
    octave: match[3] ? Number(match[3]) : undefined,
  };
}

export function buildAliases(note: Pick<FluteNote, "id" | "letter" | "accidental" | "octave" | "enharmonic">) {
  const out = new Set<string>();
  const { symbol, ascii } = accidentalMarks(note.accidental);
  out.add(note.id);
  out.add(note.id.toLowerCase());
  out.add(`${note.letter}${ascii}${note.octave}`);
  out.add(`${note.letter}${symbol}${note.octave}`);
  addNoteAliases(out, note.letter as LetterName, ascii as "" | "#" | "b", note.octave);
  addNoteAliases(out, note.letter as LetterName, ascii as "" | "#" | "b");

  if (!note.accidental && note.letter === "C" && note.octave === 4) {
    out.add("씨포");
  }

  if (note.enharmonic) {
    const parsed = parseNoteName(note.enharmonic.replace("♯", "#").replace("♭", "b"));
    out.add(note.enharmonic);
    out.add(note.enharmonic.replace("♯", "#").replace("♭", "b"));
    if (parsed) {
      addNoteAliases(out, parsed.letter, parsed.accidental as "" | "#" | "b", parsed.octave);
      addNoteAliases(out, parsed.letter, parsed.accidental as "" | "#" | "b");
    }
  }

  return [...new Set([...out, ...[...out].map(normalizeSearch)])];
}
