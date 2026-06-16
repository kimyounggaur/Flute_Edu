export interface PracticeStep {
  id: string;
  dur: number;
}

export interface PracticeSong {
  title: string;
  bpm: number;
  steps: PracticeStep[];
}

export const PRACTICE = {
  cMajorScaleUp: { title: "다장조 스케일(상행)", bpm: 80, steps: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"].map((id) => ({ id, dur: 1 })) },
  cMajorScaleDown: { title: "다장조 스케일(하행)", bpm: 80, steps: ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"].map((id) => ({ id, dur: 1 })) },
  twinkle: {
    title: "작은별",
    bpm: 96,
    steps: [
      { id: "C4", dur: 1 },
      { id: "C4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "A4", dur: 1 },
      { id: "A4", dur: 1 },
      { id: "G4", dur: 2 },
      { id: "F4", dur: 1 },
      { id: "F4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "C4", dur: 2 },
    ],
  },
  schoolBell: {
    title: "학교종",
    bpm: 100,
    steps: [
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "A4", dur: 1 },
      { id: "A4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "E4", dur: 2 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "D4", dur: 2 },
    ],
  },
  airplane: {
    title: "비행기",
    bpm: 104,
    steps: [
      { id: "G4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "E4", dur: 2 },
      { id: "F4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "D4", dur: 2 },
      { id: "C4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "F4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 2 },
    ],
  },
  butterfly: {
    title: "나비야",
    bpm: 100,
    steps: [
      { id: "G4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "E4", dur: 2 },
      { id: "F4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "D4", dur: 2 },
      { id: "C4", dur: 1 },
      { id: "D4", dur: 1 },
      { id: "E4", dur: 1 },
      { id: "F4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 1 },
      { id: "G4", dur: 2 },
    ],
  },
} satisfies Record<string, PracticeSong>;
