import { describe, expect, it } from "vitest";
import { PRACTICE } from "../../data/practice";
import { advancePracticeIndex, getStepDurationMs, practiceProgress } from "./practiceLogic";

describe("practice logic", () => {
  it("maps BPM and duration to milliseconds", () => {
    expect(getStepDurationMs(60, 1)).toBe(1000);
    expect(getStepDurationMs(120, 2)).toBe(1000);
  });

  it("advances with wraparound and restart support", () => {
    expect(advancePracticeIndex(0, PRACTICE.twinkle.steps.length)).toBe(1);
    expect(advancePracticeIndex(PRACTICE.twinkle.steps.length - 1, PRACTICE.twinkle.steps.length)).toBe(0);
  });

  it("reports progress for the current step", () => {
    expect(practiceProgress(2, 8)).toBe(37.5);
  });
});
