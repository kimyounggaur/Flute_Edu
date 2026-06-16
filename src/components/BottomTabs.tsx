import { BookOpen, Home, Music2, Search, Trophy } from "lucide-react";
import type { TabId } from "../store/appStore";

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "홈", icon: Home },
  { id: "explore", label: "운지", icon: Search },
  { id: "learn", label: "배우기", icon: BookOpen },
  { id: "practice", label: "연습", icon: Music2 },
  { id: "quiz", label: "퀴즈", icon: Trophy },
];

export function BottomTabs({ activeTab, onChange }: { activeTab: TabId; onChange: (tab: TabId) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-hair bg-card/96 px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-2 shadow-[0_-12px_30px_rgba(42,51,66,0.08)] backdrop-blur" aria-label="하단 탭">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {TABS.map(({ id, label, icon: Icon }) => {
          const selected = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onChange(id)}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-[12px] text-xs font-bold transition ${
                selected ? "bg-ink text-white" : "text-muted hover:bg-paper hover:text-ink"
              }`}
            >
              <Icon aria-hidden="true" size={19} strokeWidth={2.3} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
