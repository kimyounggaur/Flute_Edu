import { describe, expect, it } from "vitest";
import { NOTES } from "./notes";

const byId = (id: string) => NOTES.find((note) => note.id === id);

describe("approved fingering data", () => {
  it("keeps each note id unique", () => {
    expect(new Set(NOTES.map((note) => note.id)).size).toBe(NOTES.length);
  });

  it("marks B3 as B-foot only", () => {
    expect(byId("B3")?.fingerings[0]).toMatchObject({
      requiresBFoot: true,
      keys: expect.arrayContaining(["bFoot"]),
    });
  });

  it("leaves E-flat open for D4 and D5", () => {
    expect(byId("D4")?.fingerings[0].keys).not.toContain("eb");
    expect(byId("D5")?.fingerings[0].keys).not.toContain("eb");
  });

  it("offers the two approved B-flat fingerings with thumb B-flat recommended", () => {
    const bb4 = byId("Bb4");
    expect(bb4?.fingerings).toHaveLength(2);
    expect(bb4?.fingerings[0]).toMatchObject({
      recommended: true,
      altLabel: "엄지 B♭ 레버",
      keys: ["thumbBb", "lh1", "eb"],
    });
    expect(bb4?.fingerings[1]).toMatchObject({
      altLabel: "오른손 검지(1+1)",
      keys: ["thumbB", "lh1", "rh1", "eb"],
    });
  });

  it("offers both C7 variants and flags the gizmo option", () => {
    const c7 = byId("C7");
    expect(c7?.fingerings).toHaveLength(2);
    expect(c7?.fingerings[0]).toMatchObject({
      recommended: true,
      altLabel: "C풋(모든 악기)",
    });
    expect(c7?.fingerings[1]).toMatchObject({
      altLabel: "B풋 + 기즈모",
      requiresBFoot: true,
      requiresGizmo: true,
      keys: expect.arrayContaining(["gizmo"]),
    });
  });
});
