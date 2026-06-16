import { RotateCcw, X } from "lucide-react";
import type { AppSettings } from "../../store/appStore";

export function SettingsView({ settings, onChange, onReset, onClose }: { settings: AppSettings; onChange: (patch: Partial<AppSettings>) => void; onReset: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-ink/30 p-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]" role="dialog" aria-modal="true" aria-label="설정">
      <div className="mx-auto max-w-lg rounded-app border border-hair bg-card p-4 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">설정</h2>
          <button type="button" aria-label="설정 닫기" onClick={onClose} className="grid size-11 place-items-center rounded-full border border-hair">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <Toggle label="B풋 악기" checked={settings.footJoint === "B"} onChange={(checked) => onChange({ footJoint: checked ? "B" : "C" })} />
          <Toggle label="초보자 모드" checked={settings.beginnerMode} onChange={(beginnerMode) => onChange({ beginnerMode })} />
          <Toggle label="모션 줄이기" checked={settings.reducedMotion} onChange={(reducedMotion) => onChange({ reducedMotion })} />
          <Toggle label="햅틱" checked={settings.haptics} onChange={(haptics) => onChange({ haptics })} />
          <Toggle label="음소거" checked={settings.muted} onChange={(muted) => onChange({ muted })} />
          <label className="block rounded-[12px] bg-paper p-3">
            <span className="text-sm font-bold text-muted">음량 {Math.round(settings.volume * 100)}%</span>
            <input type="range" min="0" max="1" step="0.05" value={settings.volume} onChange={(event) => onChange({ volume: Number(event.target.value) })} className="mt-2 w-full accent-[var(--brass)]" />
          </label>
          <button type="button" onClick={onReset} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px] border border-warn text-sm font-black text-warn">
            <RotateCcw size={18} /> 데이터 초기화
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-12 items-center justify-between rounded-[12px] bg-paper p-3">
      <span className="font-bold">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-5 accent-[var(--brass)]" />
    </label>
  );
}
