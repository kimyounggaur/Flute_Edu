export type KeyId =
  | "thumbB"
  | "thumbBb"
  | "lh1"
  | "lh2"
  | "lh3"
  | "gs"
  | "rh1"
  | "rh2"
  | "rh3"
  | "dTrill"
  | "dSharpTrill"
  | "eb"
  | "csFoot"
  | "cFoot"
  | "bFoot"
  | "gizmo";

export type Register = 1 | 2 | 3;
export type Accidental = "sharp" | "flat";
export type LetterName = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export interface Fingering {
  keys: KeyId[];
  recommended?: boolean;
  requiresBFoot?: boolean;
  requiresGizmo?: boolean;
  altLabel?: string;
}

export interface FluteNote {
  id: string;
  letter: LetterName;
  accidental?: Accidental;
  octave: number;
  midi: number;
  enharmonic?: string;
  register: Register;
  fingerings: Fingering[];
  note?: string;
}

export const freqOf = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
