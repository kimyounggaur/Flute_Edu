import { Settings } from "lucide-react";
import type { DisplayMode, RegisterFilter, SolfegeMode } from "../store/appStore";
import type { LetterName } from "../data/types";
import { SegmentedControl } from "./SegmentedControl";

interface TopControlsProps {
  register: RegisterFilter;
  displayMode: DisplayMode;
  solfegeMode: SolfegeMode;
  selectedKey: LetterName;
  onRegister: (register: RegisterFilter) => void;
  onDisplay: (mode: DisplayMode) => void;
  onSolfegeMode: (mode: SolfegeMode) => void;
  onKey: (key: LetterName) => void;
  onSettings: () => void;
}

export function TopControls({ register, displayMode, solfegeMode, selectedKey, onRegister, onDisplay, onSolfegeMode, onKey, onSettings }: TopControlsProps) {
  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-hair bg-paper/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.5rem)] backdrop-blur">
      <div className="mx-auto max-w-5xl space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-brass">Flute Fingering Lab</p>
            <h1 className="text-2xl font-black tracking-normal">플루트 핑거링 랩</h1>
          </div>
          <button type="button" aria-label="설정 열기" onClick={onSettings} className="grid size-12 place-items-center rounded-full border border-hair bg-card text-ink shadow-sm">
            <Settings size={22} />
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <SegmentedControl<RegisterFilter>
            label="음역"
            value={register}
            onChange={onRegister}
            options={[
              { label: "저", value: 1 },
              { label: "중", value: 2 },
              { label: "고", value: 3 },
            ]}
            compact
          />
          <SegmentedControl<DisplayMode>
            label="표기"
            value={displayMode}
            onChange={onDisplay}
            options={[
              { label: "음", value: "note" },
              { label: "계", value: "solfege" },
              { label: "둘 다", value: "both" },
            ]}
            compact
          />
          <SegmentedControl<SolfegeMode>
            label="도법"
            value={solfegeMode}
            onChange={onSolfegeMode}
            options={[
              { label: "고정", value: "fixed" },
              { label: "이동", value: "movable" },
            ]}
            compact
          />
          <SegmentedControl<LetterName>
            label="조"
            value={selectedKey}
            onChange={onKey}
            options={(["C", "G", "F"] as LetterName[]).map((key) => ({ label: key, value: key }))}
            compact
          />
        </div>
      </div>
    </div>
  );
}
