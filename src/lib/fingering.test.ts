import { describe, expect, it } from "vitest";
import { findMatchingFingerings, keySignature } from "./fingering";

describe("fingering reverse lookup", () => {
  it("compares key sets independent of order", () => {
    expect(keySignature(["eb", "lh3", "thumbB", "lh1", "lh2"])).toBe(keySignature(["thumbB", "lh1", "lh2", "lh3", "eb"]));
  });

  it("matches the approved G4 fingering exactly", () => {
    const matches = findMatchingFingerings(["lh1", "lh2", "lh3", "thumbB", "eb"]);
    expect(matches.map((match) => match.note.id)).toEqual(expect.arrayContaining(["G4", "G5"]));
  });

  it("does not guess undefined fingerings", () => {
    expect(findMatchingFingerings(["thumbBb", "gizmo"])).toEqual([]);
  });
});
