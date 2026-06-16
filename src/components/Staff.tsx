import { useEffect, useMemo, useRef } from "react";
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import { NOTES } from "../data/notes";
import type { FluteNote } from "../data/types";
import { prettyNoteName } from "../lib/music";

const STAFF_NOTES = NOTES.filter((note) => note.midi >= 60 && note.midi <= 96);

function vexKey(note: FluteNote) {
  const acc = note.accidental === "sharp" ? "#" : note.accidental === "flat" ? "b" : "";
  return `${note.letter.toLowerCase()}${acc}/${note.octave}`;
}

export function Staff({ note, onSelectNote, onPlay }: { note: FluteNote; onSelectNote: (note: FluteNote) => void; onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const noteIndex = useMemo(() => STAFF_NOTES.findIndex((item) => item.id === note.id), [note.id]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const renderer = new Renderer(ref.current, Renderer.Backends.SVG);
    renderer.resize(340, 150);
    const context = renderer.getContext();
    const stave = new Stave(12, 28, 310);
    stave.addClef("treble");
    stave.setContext(context).draw();

    const staveNote = new StaveNote({ clef: "treble", keys: [vexKey(note)], duration: "q" });
    if (note.accidental) {
      staveNote.addModifier(new Accidental(note.accidental === "sharp" ? "#" : "b"), 0);
    }
    const voice = new Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables([staveNote]);
    new Formatter().joinVoices([voice]).format([voice], 130);
    voice.draw(context, stave);
  }, [note]);

  return (
    <div className="relative overflow-hidden rounded-app border border-hair bg-card shadow-sm">
      <button type="button" onClick={onPlay} className="absolute inset-x-4 top-3 z-10 min-h-11 rounded-[12px] text-left text-sm font-bold text-muted" aria-label={`${prettyNoteName(note)} 음표 재생`}>
        오선보
      </button>
      <div ref={ref} className="mx-auto mt-4 h-[150px] w-full max-w-[340px]" aria-hidden="true" />
      <div className="absolute inset-x-3 bottom-3 top-12" aria-label="오선보 음 선택 슬롯">
        {STAFF_NOTES.map((slotNote, index) => {
          const top = ((STAFF_NOTES.length - 1 - index) / STAFF_NOTES.length) * 100;
          const active = index === noteIndex;
          return (
            <button
              key={slotNote.id}
              type="button"
              aria-label={`${prettyNoteName(slotNote)} 선택`}
              onClick={() => onSelectNote(slotNote)}
              className={`absolute left-0 min-h-[8px] w-full rounded-full transition ${active ? "bg-hl/35" : "bg-transparent"}`}
              style={{ top: `${top}%`, height: `${100 / STAFF_NOTES.length}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
