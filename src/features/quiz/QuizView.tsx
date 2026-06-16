import { Check, RotateCcw, Timer, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FluteDiagram } from "../../components/FluteDiagram";
import { Staff } from "../../components/Staff";
import { NOTES } from "../../data/notes";
import type { AppSettings, RegisterFilter } from "../../store/appStore";
import { playNote } from "../../lib/audio";
import { notesByRegister } from "../../lib/noteQueries";
import { createQuizQuestion, QuizType, scoreQuizAnswer, summarizeQuizSession } from "./quizLogic";

const TYPES: { id: QuizType; label: string }[] = [
  { id: "fingering-to-name", label: "운지→이름" },
  { id: "name-to-fingering", label: "이름→운지" },
  { id: "staff-to-name", label: "오선보→이름" },
];

export function QuizView({ register, settings, onBest }: { register: RegisterFilter; settings: AppSettings; onBest: (score: number, streak: number) => void }) {
  const [type, setType] = useState<QuizType>("fingering-to-name");
  const [seed, setSeed] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const pool = useMemo(() => notesByRegister(NOTES, register).filter((note) => note.id !== "B3"), [register]);
  const question = useMemo(() => createQuizQuestion({ type, notes: pool, seed }), [pool, seed, type]);
  const summary = total >= 10 ? summarizeQuizSession({ total, correct, misses }) : null;

  const answer = (value: string) => {
    if (selected) return;
    const result = scoreQuizAnswer({ answer: question.answer, selected: value, streak, misses });
    setSelected(value);
    setStreak(result.streak);
    setMisses(result.misses);
    setCorrect((score) => score + (result.isCorrect ? 1 : 0));
    setTotal((count) => count + 1);
    if (result.isCorrect) {
      navigator.vibrate?.(10);
      playNote(question.note, { muted: settings.muted, volume: settings.volume });
    } else {
      navigator.vibrate?.([15, 30, 15]);
    }
    window.setTimeout(() => {
      setSelected(null);
      setSeed((valueSeed) => valueSeed + 1);
    }, 850);
    onBest(correct + (result.isCorrect ? 1 : 0), result.streak);
  };

  const reset = () => {
    setSeed((value) => value + 3);
    setSelected(null);
    setCorrect(0);
    setTotal(0);
    setStreak(0);
    setMisses([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TYPES.map((item) => (
          <button key={item.id} type="button" onClick={() => setType(item.id)} className={`min-h-12 shrink-0 rounded-full border px-4 text-sm font-black ${type === item.id ? "border-ink bg-ink text-white" : "border-hair bg-card"}`}>
            {item.label}
          </button>
        ))}
      </div>

      <section className="rounded-app border border-hair bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-black">{question.prompt}</p>
          <div className="flex gap-2 text-sm font-black">
            <span className="rounded-full bg-paper px-3 py-2">연속 {streak}</span>
            <span className="flex items-center gap-1 rounded-full bg-paper px-3 py-2">
              <Timer size={16} /> {Math.min(total + 1, 10)}/10
            </span>
          </div>
        </div>
        {type === "fingering-to-name" ? <FluteDiagram pressed={question.note.fingerings[0].keys} showLabels /> : null}
        {type === "staff-to-name" ? <Staff note={question.note} onSelectNote={() => undefined} onPlay={() => playNote(question.note, { muted: settings.muted, volume: settings.volume })} /> : null}
        {type === "name-to-fingering" ? <p className="rounded-[12px] bg-paper p-4 text-center text-3xl font-black">{question.answer}</p> : null}
      </section>

      {type === "name-to-fingering" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.choices.map((choice) => {
            const choiceNote = NOTES.find((note) => note.id === choice.replace("♯", "#").replace("♭", "b")) ?? question.note;
            return (
              <button key={choice} type="button" onClick={() => answer(choice)} className={`min-h-28 rounded-app border p-2 ${selected === choice ? (choice === question.answer ? "border-ok bg-ok/10" : "border-warn bg-warn/10") : "border-hair bg-card"}`}>
                <FluteDiagram pressed={choiceNote.fingerings[0].keys} showLabels />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {question.choices.map((choice) => {
            const state = selected === choice ? (choice === question.answer ? "ok" : "warn") : selected && choice === question.answer ? "ok" : "idle";
            return (
              <button key={choice} type="button" onClick={() => answer(choice)} className={`flex min-h-14 items-center justify-center gap-2 rounded-app border text-lg font-black ${state === "ok" ? "border-ok bg-ok/10 text-ok" : state === "warn" ? "border-warn bg-warn/10 text-warn" : "border-hair bg-card"}`}>
                {state === "ok" ? <Check size={18} /> : state === "warn" ? <X size={18} /> : null}
                {choice}
              </button>
            );
          })}
        </div>
      )}

      {summary ? (
        <section className="rounded-app border border-hair bg-card p-4 shadow-sm">
          <h2 className="text-xl font-black">결과 {summary.accuracy}%</h2>
          <p className="mt-1 text-sm text-muted">
            {summary.correct}/{summary.total} 정답 · 복습 음 {summary.reviewIds.join(", ") || "없음"}
          </p>
          <button type="button" onClick={reset} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-ink px-4 font-black text-white">
            <RotateCcw size={18} /> 다시 풀기
          </button>
        </section>
      ) : null}
    </div>
  );
}
