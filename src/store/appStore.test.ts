import { describe, expect, it } from "vitest";
import { NOTES } from "../data/notes";
import { createDefaultSettings, filterAvailableNotes, sanitizeSettings } from "./appStore";

describe("app settings", () => {
  it("uses beginner-friendly defaults", () => {
    expect(createDefaultSettings()).toMatchObject({
      footJoint: "C",
      displayMode: "both",
      solfegeMode: "fixed",
      selectedKey: "C",
      beginnerMode: true,
      muted: false,
      volume: 0.7,
    });
  });

  it("defensively repairs invalid persisted values", () => {
    expect(sanitizeSettings({ volume: 4, footJoint: "Z", displayMode: "bad", selectedKey: "H" })).toMatchObject({
      footJoint: "C",
      displayMode: "both",
      selectedKey: "C",
      volume: 1,
    });
  });

  it("hides B-foot-only notes and variants when C foot is selected", () => {
    const available = filterAvailableNotes(NOTES, "C");
    expect(available.find((note) => note.id === "B3")).toBeUndefined();
    expect(available.find((note) => note.id === "C7")?.fingerings).toHaveLength(1);
  });
});
