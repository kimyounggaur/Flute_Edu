import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { FluteNote, LetterName } from "../data/types";

export type TabId = "home" | "explore" | "learn" | "practice" | "quiz";
export type RegisterFilter = 1 | 2 | 3;
export type DisplayMode = "note" | "solfege" | "both";
export type SolfegeMode = "fixed" | "movable";
export type FootJoint = "C" | "B";

export interface AppSettings {
  footJoint: FootJoint;
  displayMode: DisplayMode;
  solfegeMode: SolfegeMode;
  selectedKey: LetterName;
  beginnerMode: boolean;
  reducedMotion: boolean;
  haptics: boolean;
  microphoneEnabled: boolean;
  muted: boolean;
  volume: number;
}

export interface AppProgress {
  lastNoteId: string;
  quizBestScore: number;
  bestStreak: number;
  completedLessons: string[];
  customPracticeIds: string[];
  onboardingDone: boolean;
}

export interface AppState {
  activeTab: TabId;
  selectedRegister: RegisterFilter;
  selectedNoteId: string;
  settings: AppSettings;
  progress: AppProgress;
  setActiveTab: (tab: TabId) => void;
  setSelectedRegister: (register: RegisterFilter) => void;
  setSelectedNoteId: (noteId: string) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  updateProgress: (patch: Partial<AppProgress>) => void;
  resetData: () => void;
}

const VALID_KEYS: LetterName[] = ["C", "D", "E", "F", "G", "A", "B"];
const VALID_DISPLAY: DisplayMode[] = ["note", "solfege", "both"];
const VALID_SOLFEGE: SolfegeMode[] = ["fixed", "movable"];
const VALID_FOOT: FootJoint[] = ["C", "B"];

const memoryStorage = new Map<string, string>();

function safeLocalStorage(): StateStorage {
  if (typeof window !== "undefined" && window.localStorage && typeof window.localStorage.setItem === "function") {
    return window.localStorage;
  }
  return {
    getItem: (name) => memoryStorage.get(name) ?? null,
    setItem: (name, value) => {
      memoryStorage.set(name, value);
    },
    removeItem: (name) => {
      memoryStorage.delete(name);
    },
  };
}

export function createDefaultSettings(): AppSettings {
  return {
    footJoint: "C",
    displayMode: "both",
    solfegeMode: "fixed",
    selectedKey: "C",
    beginnerMode: true,
    reducedMotion: false,
    haptics: true,
    microphoneEnabled: false,
    muted: false,
    volume: 0.7,
  };
}

export function createDefaultProgress(): AppProgress {
  return {
    lastNoteId: "C4",
    quizBestScore: 0,
    bestStreak: 0,
    completedLessons: [],
    customPracticeIds: [],
    onboardingDone: false,
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function sanitizeSettings(input: unknown): AppSettings {
  const defaults = createDefaultSettings();
  if (!input || typeof input !== "object") return defaults;
  const value = input as Partial<AppSettings>;
  return {
    footJoint: VALID_FOOT.includes(value.footJoint as FootJoint) ? (value.footJoint as FootJoint) : defaults.footJoint,
    displayMode: VALID_DISPLAY.includes(value.displayMode as DisplayMode) ? (value.displayMode as DisplayMode) : defaults.displayMode,
    solfegeMode: VALID_SOLFEGE.includes(value.solfegeMode as SolfegeMode) ? (value.solfegeMode as SolfegeMode) : defaults.solfegeMode,
    selectedKey: VALID_KEYS.includes(value.selectedKey as LetterName) ? (value.selectedKey as LetterName) : defaults.selectedKey,
    beginnerMode: typeof value.beginnerMode === "boolean" ? value.beginnerMode : defaults.beginnerMode,
    reducedMotion: typeof value.reducedMotion === "boolean" ? value.reducedMotion : defaults.reducedMotion,
    haptics: typeof value.haptics === "boolean" ? value.haptics : defaults.haptics,
    microphoneEnabled: typeof value.microphoneEnabled === "boolean" ? value.microphoneEnabled : defaults.microphoneEnabled,
    muted: typeof value.muted === "boolean" ? value.muted : defaults.muted,
    volume: typeof value.volume === "number" && Number.isFinite(value.volume) ? clamp(value.volume, 0, 1) : defaults.volume,
  };
}

export function filterAvailableNotes(notes: FluteNote[], footJoint: FootJoint) {
  return notes
    .map((note) => ({
      ...note,
      fingerings: footJoint === "B" ? note.fingerings : note.fingerings.filter((fingering) => !fingering.requiresBFoot),
    }))
    .filter((note) => note.fingerings.length > 0);
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeTab: "home",
      selectedRegister: 1,
      selectedNoteId: "C4",
      settings: createDefaultSettings(),
      progress: createDefaultProgress(),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSelectedRegister: (register) => set({ selectedRegister: register }),
      setSelectedNoteId: (noteId) =>
        set((state) => ({
          selectedNoteId: noteId,
          progress: { ...state.progress, lastNoteId: noteId },
        })),
      updateSettings: (patch) =>
        set((state) => ({
          settings: sanitizeSettings({ ...state.settings, ...patch }),
        })),
      updateProgress: (patch) =>
        set((state) => ({
          progress: { ...state.progress, ...patch },
        })),
      resetData: () =>
        set({
          selectedRegister: 1,
          selectedNoteId: "C4",
          settings: createDefaultSettings(),
          progress: createDefaultProgress(),
        }),
    }),
    {
      name: "flute-fingering-lab",
      storage: createJSONStorage(safeLocalStorage),
      partialize: (state) => ({
        selectedRegister: state.selectedRegister,
        selectedNoteId: state.selectedNoteId,
        settings: state.settings,
        progress: state.progress,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<AppState> | undefined;
        return {
          ...current,
          ...saved,
          settings: sanitizeSettings(saved?.settings),
          progress: { ...createDefaultProgress(), ...(saved?.progress ?? {}) },
        };
      },
    },
  ),
);
