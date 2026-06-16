import { describe, expect, it } from "vitest";
import { NOTES } from "../../data/notes";
import { createQuizQuestion, scoreQuizAnswer, summarizeQuizSession } from "./quizLogic";

describe("quiz logic", () => {
  it("creates a four-choice note-name question from a register range", () => {
    const question = createQuizQuestion({ type: "fingering-to-name", notes: NOTES.filter((note) => note.register === 1), seed: 1 });
    expect(question.choices).toHaveLength(4);
    expect(question.choices).toContain(question.answer);
  });

  it("updates streak and misses for answers", () => {
    const correct = scoreQuizAnswer({ answer: "C4", selected: "C4", streak: 2, misses: [] });
    expect(correct).toMatchObject({ isCorrect: true, streak: 3 });

    const wrong = scoreQuizAnswer({ answer: "C4", selected: "D4", streak: 2, misses: [] });
    expect(wrong).toMatchObject({ isCorrect: false, streak: 0, misses: ["C4"] });
  });

  it("summarizes a ten-question session", () => {
    expect(summarizeQuizSession({ total: 10, correct: 7, misses: ["D4", "D4", "G5"] })).toEqual({
      total: 10,
      correct: 7,
      accuracy: 70,
      reviewIds: ["D4", "G5"],
    });
  });
});
