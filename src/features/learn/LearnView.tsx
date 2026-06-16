import { BookOpen, Hand, Layers, Wind } from "lucide-react";
import { FluteDiagram } from "../../components/FluteDiagram";
import { NOTES } from "../../data/notes";
import type { AppSettings } from "../../store/appStore";
import { displayNote } from "../../lib/noteQueries";

const FIRST_NOTES = ["C4", "D4", "E4", "F4", "G4"].map((id) => NOTES.find((note) => note.id === id)!);

export function LearnView({ settings }: { settings: AppSettings }) {
  return (
    <div className="space-y-4">
      <Concept icon={Hand} title="플루트 키 이름">
        <FluteDiagram pressed={["thumbB", "lh1", "lh2", "lh3", "eb"]} showLabels />
      </Concept>
      <Concept icon={BookOpen} title="음이름과 계이름">
        <div className="grid grid-cols-5 gap-2">
          {FIRST_NOTES.map((note) => (
            <div key={note.id} className="rounded-[12px] bg-paper p-3 text-center">
              <p className="text-lg font-black">{displayNote(note, "solfege", settings.solfegeMode, settings.selectedKey)}</p>
              <p className="text-sm font-bold text-muted">{note.id}</p>
            </div>
          ))}
        </div>
      </Concept>
      <Concept icon={Layers} title="옥타브와 같은 운지">
        <p className="text-sm leading-6 text-muted">G4와 G5처럼 같은 키 조합으로 보이는 음도 바람 중심과 속도가 달라집니다. 앱은 운지를 보여 주고, 음역별 팁으로 호흡 차이를 함께 알려줍니다.</p>
      </Concept>
      <Concept icon={Wind} title="첫 5음">
        <p className="text-sm leading-6 text-muted">도4부터 솔4까지 천천히 눌러 보며 소리를 들어보세요. D4는 E♭ 키를 떼는 점이 중요합니다.</p>
      </Concept>
    </div>
  );
}

function Concept({ icon: Icon, title, children }: { icon: typeof BookOpen; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-app border border-hair bg-card p-4 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-black">
        <Icon className="text-brass" size={22} /> {title}
      </h2>
      {children}
    </section>
  );
}
