import { describe, expect, it } from "vitest";
import { NOTES } from "../data/notes";
import { buildAliases, freqOf, keysToSteps, keysToToken, normalizeSearch, solfegeFixed, solfegeMovable } from "./music";

const note = (id: string) => {
  const found = NOTES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing ${id}`);
  return found;
};

describe("music helpers", () => {
  it("calculates frequency from MIDI", () => {
    expect(freqOf(60)).toBeCloseTo(261.6256, 3);
    expect(freqOf(69)).toBe(440);
  });

  it("formats fixed-do solfege", () => {
    expect(solfegeFixed("C")).toBe("도");
    expect(solfegeFixed("B", "flat")).toBe("내림시(시♭)");
    expect(solfegeFixed("F", "sharp")).toBe("올림파(파♯)");
  });

  it("formats movable-do solfege from the selected key", () => {
    expect(solfegeMovable(note("G4"), "G")).toBe("도");
    expect(solfegeMovable(note("A4"), "G")).toBe("레");
    expect(solfegeMovable(note("F#4"), "G")).toBe("시");
  });

  it("builds Korean and romanized search aliases", () => {
    expect(buildAliases(note("Bb4"))).toEqual(expect.arrayContaining(["Bb4", "bb4", "시♭4", "시b4", "sib4"]));
    expect(buildAliases(note("C4"))).toEqual(expect.arrayContaining(["C4", "c4", "도4", "do4", "씨포"]));
  });

  it("normalizes user search input before matching", () => {
    expect(normalizeSearch(" B flat ")).toBe("bb");
    expect(normalizeSearch("시♭4")).toBe("시b4");
    expect(normalizeSearch("라#")).toBe("라#");
  });

  it("derives readable step instructions and compact tokens from keys", () => {
    const g4 = note("G4").fingerings[0].keys;
    expect(keysToSteps(g4)[0]).toContain("왼손 엄지");
    expect(keysToToken(g4)).toBe("T 123 | ---Eb");
  });
});
