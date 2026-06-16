import { ArrowRight, CalendarDays, Search, Sparkles } from "lucide-react";
import { NOTES } from "../../data/notes";
import type { FluteNote } from "../../data/types";
import { SearchBox } from "../../components/SearchBox";
import { displayNote, registerLabel } from "../../lib/noteQueries";
import type { AppSettings } from "../../store/appStore";

const DAILY_IDS = ["C4", "D4", "E4", "F4", "G4"];
const DAILY_NOTES = DAILY_IDS.map((id) => NOTES.find((note) => note.id === id)).filter(Boolean) as FluteNote[];

export function HomeView({
  notes,
  settings,
  onboardingDone,
  onSelectNote,
  onStartPractice,
  onFinishOnboarding,
}: {
  notes: FluteNote[];
  settings: AppSettings;
  onboardingDone: boolean;
  onSelectNote: (note: FluteNote) => void;
  onStartPractice: () => void;
  onFinishOnboarding: () => void;
}) {
  return (
    <div className="space-y-5">
      {!onboardingDone ? (
        <section className="rounded-app border border-hair bg-card p-4 shadow-soft">
          <p className="text-sm font-bold text-brass">처음이라면</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["음 고르기", "운지 보기", "소리 듣기"].map((step, index) => (
              <div key={step} className="rounded-[12px] bg-paper p-3">
                <span className="grid size-7 place-items-center rounded-full bg-ink text-sm font-black text-white">{index + 1}</span>
                <p className="mt-2 font-black">{step}</p>
              </div>
            ))}
          </div>
          <button type="button" onClick={onFinishOnboarding} className="mt-3 min-h-11 rounded-full bg-ink px-4 text-sm font-black text-white">
            바로 시작
          </button>
        </section>
      ) : null}

      <SearchBox notes={notes} settings={settings} onSelect={onSelectNote} />

      <section className="overflow-hidden rounded-app border border-hair bg-card shadow-soft">
        <div className="relative min-h-40">
          <img src="/assets/realistic-3d-detailed-classical-flute.jpg" alt="실제 플루트" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
          <div className="relative max-w-[18rem] p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-bold text-hl">
              <Sparkles size={17} /> 오늘의 5음
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight">도4부터 솔4까지</h2>
            <p className="mt-2 text-sm text-white/85">처음 플루트에서 가장 많이 만나는 운지를 바로 눌러볼 수 있어요.</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 p-3">
          {DAILY_NOTES.map((note) => (
            <button key={note.id} type="button" onClick={() => onSelectNote(note)} className="min-h-16 rounded-[12px] border border-hair bg-paper px-1 text-center">
              <span className="block text-lg font-black">{displayNote(note, "solfege", settings.solfegeMode, settings.selectedKey)}</span>
              <span className="text-xs font-bold text-muted">{note.id}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={() => onSelectNote(NOTES.find((note) => note.id === "Bb4")!)} className="min-h-24 rounded-app border border-hair bg-card p-4 text-left shadow-sm">
          <Search className="mb-3 text-brass" size={22} />
          <span className="block text-base font-black">시♭ 바로 보기</span>
          <span className="text-sm text-muted">두 가지 대체 운지 비교</span>
        </button>
        <button type="button" onClick={onStartPractice} className="min-h-24 rounded-app border border-hair bg-card p-4 text-left shadow-sm">
          <CalendarDays className="mb-3 text-brass" size={22} />
          <span className="block text-base font-black">작은별 따라가기</span>
          <span className="text-sm text-muted">운지와 소리 동기화</span>
        </button>
        <button type="button" onClick={() => onSelectNote(NOTES.find((note) => note.id === "D5")!)} className="min-h-24 rounded-app border border-hair bg-card p-4 text-left shadow-sm">
          <ArrowRight className="mb-3 text-brass" size={22} />
          <span className="block text-base font-black">중음역 시작</span>
          <span className="text-sm text-muted">{registerLabel(2)} D5</span>
        </button>
      </section>
    </div>
  );
}
