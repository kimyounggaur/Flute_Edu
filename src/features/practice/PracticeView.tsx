import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FluteDiagram } from "../../components/FluteDiagram";
import { Staff } from "../../components/Staff";
import { NOTES } from "../../data/notes";
import { PRACTICE } from "../../data/practice";
import type { AppSettings } from "../../store/appStore";
import { playNote } from "../../lib/audio";
import { displayNote, findNoteById } from "../../lib/noteQueries";
import { advancePracticeIndex, getStepDurationMs, practiceProgress } from "./practiceLogic";

export function PracticeView({ settings, customIds }: { settings: AppSettings; customIds: string[] }) {
  const [songId, setSongId] = useState<keyof typeof PRACTICE>("cMajorScaleUp");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(PRACTICE[songId].bpm);
  const song = PRACTICE[songId];
  const steps = useMemo(() => (customIds.length ? [...song.steps, ...customIds.map((id) => ({ id, dur: 1 }))] : song.steps), [customIds, song.steps]);
  const currentStep = steps[index] ?? steps[0];
  const note = findNoteById(NOTES, currentStep.id);

  useEffect(() => {
    setBpm(PRACTICE[songId].bpm);
    setIndex(0);
    setPlaying(false);
  }, [songId]);

  useEffect(() => {
    if (!playing) return;
    playNote(note, { muted: settings.muted, volume: settings.volume });
    const timer = window.setTimeout(() => setIndex((value) => advancePracticeIndex(value, steps.length)), getStepDurationMs(bpm, currentStep.dur));
    return () => window.clearTimeout(timer);
  }, [bpm, currentStep.dur, note, playing, settings.muted, settings.volume, steps.length]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(PRACTICE).map(([id, item]) => (
          <button key={id} type="button" onClick={() => setSongId(id as keyof typeof PRACTICE)} className={`min-h-12 shrink-0 rounded-full border px-4 text-sm font-black ${songId === id ? "border-ink bg-ink text-white" : "border-hair bg-card"}`}>
            {item.title}
          </button>
        ))}
      </div>

      <section className="rounded-app border border-hair bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-brass">{song.title}</p>
            <h2 className="text-3xl font-black">{displayNote(note, settings.displayMode, settings.solfegeMode, settings.selectedKey)}</h2>
          </div>
          <span className="rounded-full bg-paper px-3 py-2 text-sm font-black">{practiceProgress(index, steps.length)}%</span>
        </div>
        <Staff note={note} onSelectNote={() => undefined} onPlay={() => playNote(note, { muted: settings.muted, volume: settings.volume })} />
        <div className="mt-4">
          <FluteDiagram pressed={note.fingerings[0].keys} showLabels glowKeys={note.fingerings[0].keys} />
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((step, stepIndex) => {
          const stepNote = findNoteById(NOTES, step.id);
          return (
            <button key={`${step.id}-${stepIndex}`} type="button" onClick={() => setIndex(stepIndex)} className={`min-h-16 min-w-16 rounded-[12px] border px-2 text-center ${stepIndex === index ? "border-ink bg-hl text-ink" : "border-hair bg-card"}`}>
              <span className="block font-black">{displayNote(stepNote, "solfege", settings.solfegeMode, settings.selectedKey)}</span>
              <span className="text-xs font-bold text-muted">{step.id}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-app border border-hair bg-card p-4 shadow-sm">
        <label className="text-sm font-bold text-muted" htmlFor="bpm">
          BPM {bpm}
        </label>
        <input id="bpm" type="range" min="60" max="120" step="8" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} className="mt-2 w-full accent-[var(--brass)]" />
        <div className="mt-3 grid grid-cols-4 gap-2">
          <button type="button" onClick={() => setPlaying((value) => !value)} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-ink text-sm font-black text-white">
            {playing ? <Pause size={18} /> : <Play size={18} />} {playing ? "멈춤" : "재생"}
          </button>
          <button type="button" onClick={() => setIndex((value) => advancePracticeIndex(value, steps.length))} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-hair text-sm font-bold">
            <SkipForward size={18} /> 다음
          </button>
          <button type="button" onClick={() => setIndex(0)} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-hair text-sm font-bold">
            <RotateCcw size={18} /> 처음
          </button>
          <button type="button" onClick={() => playNote(note, { muted: settings.muted, volume: settings.volume })} className="min-h-12 rounded-[12px] border border-hair text-sm font-bold">
            한 음씩
          </button>
        </div>
      </div>
    </div>
  );
}
