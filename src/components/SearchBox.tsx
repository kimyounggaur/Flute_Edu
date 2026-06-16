import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FluteNote } from "../data/types";
import { displayNote, searchNotes } from "../lib/noteQueries";
import type { AppSettings } from "../store/appStore";

export function SearchBox({ notes, settings, onSelect }: { notes: FluteNote[]; settings: AppSettings; onSelect: (note: FluteNote) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchNotes(notes, query).slice(0, 8), [notes, query]);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="note-search">
        음 검색
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 text-muted" size={20} />
      <input
        id="note-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="도4, C4, 시b, Bb, do4"
        className="min-h-12 w-full rounded-app border border-hair bg-card py-3 pl-11 pr-4 text-base font-semibold text-ink shadow-sm"
      />
      {results.length > 0 ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-40 overflow-hidden rounded-app border border-hair bg-card shadow-soft">
          {results.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => {
                onSelect(note);
                setQuery("");
              }}
              className="flex min-h-12 w-full items-center justify-between border-b border-hair px-4 text-left last:border-b-0 hover:bg-paper"
            >
              <span className="font-extrabold">{displayNote(note, settings.displayMode, settings.solfegeMode, settings.selectedKey)}</span>
              <span className="text-sm text-muted">{note.enharmonic ?? "기본음"}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
