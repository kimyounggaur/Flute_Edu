import { ChevronLeft, ChevronRight, Eraser, ListRestart, Music, Play, RotateCw, SearchCheck, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FluteDiagram } from "../../components/FluteDiagram";
import { SearchBox } from "../../components/SearchBox";
import { Staff } from "../../components/Staff";
import { NOTES } from "../../data/notes";
import type { FluteNote, KeyId } from "../../data/types";
import { findMatchingFingerings } from "../../lib/fingering";
import { displayNote, findNoteById, notesByRegister, registerLabel } from "../../lib/noteQueries";
import { freqOf, keysToSteps, keysToToken, octaveTips, prettyNoteName, solfegeFixed, solfegeMovable } from "../../lib/music";
import { getAudioStatus, playNote, unlockAudio } from "../../lib/audio";
import type { AppSettings, RegisterFilter } from "../../store/appStore";

interface ExploreViewProps {
  notes: FluteNote[];
  register: RegisterFilter;
  selectedNoteId: string;
  settings: AppSettings;
  onRegister: (register: RegisterFilter) => void;
  onSelectNote: (note: FluteNote) => void;
  onAddPractice: (noteId: string) => void;
}

function nextNote(notes: FluteNote[], current: FluteNote, offset: number) {
  const index = Math.max(0, notes.findIndex((note) => note.id === current.id));
  return notes[(index + offset + notes.length) % notes.length];
}

export function ExploreView({ notes, register, selectedNoteId, settings, onRegister, onSelectNote, onAddPractice }: ExploreViewProps) {
  const registerNotes = useMemo(() => notesByRegister(notes, register), [notes, register]);
  const selectedNote = findNoteById(registerNotes.length ? registerNotes : notes, selectedNoteId);
  const [fingeringIndex, setFingeringIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [reverseMode, setReverseMode] = useState(false);
  const [manualKeys, setManualKeys] = useState<KeyId[]>([]);
  const [vertical, setVertical] = useState(false);
  const [audioStatus, setAudioStatus] = useState(getAudioStatus());
  const [glowKeys, setGlowKeys] = useState<KeyId[]>([]);
  const touchStartX = useRef<number | null>(null);

  const fingering = selectedNote.fingerings[Math.min(fingeringIndex, selectedNote.fingerings.length - 1)];
  const steps = keysToSteps(fingering.keys);
  const reverseMatches = useMemo(() => findMatchingFingerings(manualKeys), [manualKeys]);
  const tips = [...octaveTips[selectedNote.register], selectedNote.note].filter(Boolean);
  const solfege = settings.solfegeMode === "fixed" ? solfegeFixed(selectedNote.letter, selectedNote.accidental) : solfegeMovable(selectedNote, settings.selectedKey);

  useEffect(() => {
    setFingeringIndex(0);
    setStepIndex(0);
  }, [selectedNote.id]);

  const playSelected = async () => {
    setGlowKeys(fingering.keys);
    const status = await playNote(selectedNote, { muted: settings.muted, volume: settings.volume });
    setAudioStatus(status);
    window.setTimeout(() => setGlowKeys([]), 900);
  };

  const toggleManualKey = (key: KeyId) => {
    setManualKeys((keys) => (keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key]));
  };

  const stepKeys = stepIndex < fingering.keys.length ? [fingering.keys[stepIndex]] : [];

  return (
    <div
      className="space-y-4"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 55) onSelectNote(nextNote(notes, selectedNote, delta > 0 ? -1 : 1));
        touchStartX.current = null;
      }}
    >
      <SearchBox notes={notes} settings={settings} onSelect={onSelectNote} />

      <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]" aria-label={`${registerLabel(register)} 음 선택`}>
        {registerNotes.map((note) => {
          const active = note.id === selectedNote.id;
          return (
            <button
              key={note.id}
              type="button"
              onClick={() => onSelectNote(note)}
              className={`min-h-12 shrink-0 rounded-full border px-4 text-sm font-black ${active ? "border-ink bg-ink text-white" : "border-hair bg-card text-ink"}`}
            >
              {displayNote(note, settings.displayMode, settings.solfegeMode, settings.selectedKey)}
              {note.enharmonic ? <span className="ml-2 text-xs opacity-70">{note.enharmonic}</span> : null}
            </button>
          );
        })}
      </div>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)]">
        <div className="space-y-3">
          <div className="rounded-app border border-hair bg-card p-3 shadow-sm">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-brass">{registerLabel(selectedNote.register)}</p>
                <h2 className="text-4xl font-black">{displayNote(selectedNote, settings.displayMode, settings.solfegeMode, settings.selectedKey)}</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setVertical((value) => !value)} className="grid size-11 place-items-center rounded-full border border-hair bg-paper" aria-label="플루트 세로 보기 전환">
                  <RotateCw size={19} />
                </button>
                <button type="button" onClick={() => setReverseMode((value) => !value)} className="min-h-11 rounded-full border border-hair bg-paper px-4 text-sm font-black" aria-pressed={reverseMode}>
                  거꾸로 찾기
                </button>
              </div>
            </div>
            <FluteDiagram
              pressed={reverseMode ? manualKeys : fingering.keys}
              onToggleKey={reverseMode ? toggleManualKey : undefined}
              showLabels
              vertical={vertical}
              glowKeys={reverseMode ? [] : glowKeys.length ? glowKeys : stepKeys}
            />
          </div>

          {reverseMode ? (
            <div className="rounded-app border border-hair bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-black">
                  <SearchCheck size={20} className="text-brass" /> 매칭 결과
                </p>
                <button type="button" onClick={() => setManualKeys([])} className="flex min-h-11 items-center gap-2 rounded-full border border-hair px-4 text-sm font-bold">
                  <Eraser size={17} /> 초기화
                </button>
              </div>
              {manualKeys.length === 0 ? <p className="text-sm text-muted">그림의 키를 눌러 운지를 조합하세요.</p> : null}
              {manualKeys.length > 0 && reverseMatches.length === 0 ? <p className="rounded-[12px] bg-warn/10 p-3 text-sm font-bold text-warn">정의되지 않은 운지입니다.</p> : null}
              <div className="flex flex-wrap gap-2">
                {reverseMatches.map((match) => (
                  <button key={`${match.note.id}-${match.fingeringIndex}`} type="button" onClick={() => onSelectNote(match.note)} className="min-h-11 rounded-full bg-hl px-4 text-sm font-black text-ink">
                    {displayNote(match.note, settings.displayMode, settings.solfegeMode, settings.selectedKey)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <Staff note={selectedNote} onSelectNote={onSelectNote} onPlay={playSelected} />
          )}
        </div>

        <aside className="space-y-3">
          <div className="rounded-app border border-hair bg-card p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <Info label="음이름" value={prettyNoteName(selectedNote)} />
              <Info label="계이름" value={`${solfege}${selectedNote.octave}`} />
              <Info label="주파수" value={`${freqOf(selectedNote.midi).toFixed(1)} Hz`} />
              <Info label="운지 토큰" value={keysToToken(fingering.keys)} />
            </div>
            {selectedNote.enharmonic ? <p className="mt-3 rounded-[12px] bg-paper p-3 text-sm font-bold text-muted">딴이름한소리: {selectedNote.enharmonic}</p> : null}
            {selectedNote.fingerings.length > 1 ? (
              <div className="mt-3 flex gap-2">
                {selectedNote.fingerings.map((candidate, index) => (
                  <button
                    key={candidate.altLabel ?? index}
                    type="button"
                    onClick={() => setFingeringIndex(index)}
                    className={`min-h-11 flex-1 rounded-[12px] border px-2 text-sm font-black ${index === fingeringIndex ? "border-ink bg-ink text-white" : "border-hair bg-paper"}`}
                  >
                    {candidate.altLabel ?? `운지 ${index + 1}`}
                    {candidate.recommended ? <span className="ml-1 text-xs text-hl">추천</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-app border border-hair bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-2 font-black">
                <ListRestart size={19} className="text-brass" /> 한 단계씩
              </p>
              <span className="text-sm font-bold text-muted">
                {Math.min(stepIndex + 1, steps.length)} / {steps.length}
              </span>
            </div>
            <p className="min-h-12 rounded-[12px] bg-paper p-3 text-sm font-bold">{steps[stepIndex] ?? "모든 키를 확인했습니다."}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button type="button" className="min-h-11 rounded-full border border-hair font-bold" onClick={() => setStepIndex((value) => Math.max(0, value - 1))}>
                이전
              </button>
              <button type="button" className="min-h-11 rounded-full border border-hair font-bold" onClick={() => setStepIndex(0)}>
                처음
              </button>
              <button type="button" className="min-h-11 rounded-full bg-ink font-bold text-white" onClick={() => setStepIndex((value) => (value + 1) % steps.length)}>
                다음
              </button>
            </div>
          </div>

          <div className="rounded-app border border-hair bg-card p-4 shadow-sm">
            <p className="mb-2 font-black">연주 팁</p>
            <ul className="space-y-2 text-sm text-muted">
              {tips.map((tip) => (
                <li key={tip} className="rounded-[12px] bg-paper p-3">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <div className="sticky bottom-[calc(env(safe-area-inset-bottom)+4.55rem)] z-20 rounded-app border border-hair bg-card/95 p-2 shadow-soft backdrop-blur">
        <div className="grid grid-cols-4 gap-2">
          <button type="button" onClick={playSelected} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-ink px-2 text-sm font-black text-white">
            <Play size={18} /> 재생
          </button>
          <button
            type="button"
            onClick={async () => setAudioStatus(await unlockAudio())}
            className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-hair bg-paper px-2 text-sm font-bold"
          >
            <Volume2 size={18} /> {audioStatus === "ready" ? "준비됨" : "소리"}
          </button>
          <button type="button" onClick={() => setStepIndex((value) => (value + 1) % steps.length)} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-hair bg-paper px-2 text-sm font-bold">
            <ChevronRight size={18} /> 단계
          </button>
          <button type="button" onClick={() => onAddPractice(selectedNote.id)} className="flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-hair bg-paper px-2 text-sm font-bold">
            <Music size={18} /> 추가
          </button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onSelectNote(nextNote(notes, selectedNote, -1))} className="flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-hair text-sm font-bold">
            <ChevronLeft size={17} /> 이전 음
          </button>
          <button type="button" onClick={() => onSelectNote(nextNote(notes, selectedNote, 1))} className="flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-hair text-sm font-bold">
            다음 음 <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-paper p-3">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
