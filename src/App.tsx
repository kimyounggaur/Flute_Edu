import { useState } from "react";
import { BottomTabs } from "./components/BottomTabs";
import { TopControls } from "./components/TopControls";
import { NOTES } from "./data/notes";
import type { FluteNote, LetterName } from "./data/types";
import { ExploreView } from "./features/explore/ExploreView";
import { HomeView } from "./features/home/HomeView";
import { LearnView } from "./features/learn/LearnView";
import { PitchMeter } from "./features/pitch/PitchMeter";
import { PracticeView } from "./features/practice/PracticeView";
import { QuizView } from "./features/quiz/QuizView";
import { SettingsView } from "./features/settings/SettingsView";
import { filterAvailableNotes, useAppStore } from "./store/appStore";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const activeTab = useAppStore((state) => state.activeTab);
  const selectedRegister = useAppStore((state) => state.selectedRegister);
  const selectedNoteId = useAppStore((state) => state.selectedNoteId);
  const settings = useAppStore((state) => state.settings);
  const progress = useAppStore((state) => state.progress);
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const setSelectedRegister = useAppStore((state) => state.setSelectedRegister);
  const setSelectedNoteId = useAppStore((state) => state.setSelectedNoteId);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const updateProgress = useAppStore((state) => state.updateProgress);
  const resetData = useAppStore((state) => state.resetData);
  const availableNotes = filterAvailableNotes(NOTES, settings.footJoint);
  const selectedNote = availableNotes.find((note) => note.id === selectedNoteId) ?? availableNotes[0];

  const selectNote = (note: FluteNote) => {
    setSelectedNoteId(note.id);
    setSelectedRegister(note.register);
    setActiveTab("explore");
  };

  const content = {
    home: (
      <HomeView
        notes={availableNotes}
        settings={settings}
        onboardingDone={progress.onboardingDone}
        onSelectNote={selectNote}
        onStartPractice={() => setActiveTab("practice")}
        onFinishOnboarding={() => updateProgress({ onboardingDone: true })}
      />
    ),
    explore: (
      <ExploreView
        notes={availableNotes}
        register={selectedRegister}
        selectedNoteId={selectedNote.id}
        settings={settings}
        onRegister={setSelectedRegister}
        onSelectNote={selectNote}
        onAddPractice={(noteId) => updateProgress({ customPracticeIds: [...new Set([...progress.customPracticeIds, noteId])] })}
      />
    ),
    learn: <LearnView settings={settings} />,
    practice: <PracticeView settings={settings} customIds={progress.customPracticeIds} />,
    quiz: (
      <QuizView
        register={selectedRegister}
        settings={settings}
        onBest={(score, streak) =>
          updateProgress({
            quizBestScore: Math.max(progress.quizBestScore, score),
            bestStreak: Math.max(progress.bestStreak, streak),
          })
        }
      />
    ),
  }[activeTab];

  return (
    <div className="min-h-dvh bg-paper text-ink" data-reduce-motion={settings.reducedMotion ? "true" : "false"}>
      <TopControls
        register={selectedRegister}
        displayMode={settings.displayMode}
        solfegeMode={settings.solfegeMode}
        selectedKey={settings.selectedKey}
        onRegister={setSelectedRegister}
        onDisplay={(displayMode) => updateSettings({ displayMode })}
        onSolfegeMode={(solfegeMode) => updateSettings({ solfegeMode })}
        onKey={(selectedKey: LetterName) => updateSettings({ selectedKey })}
        onSettings={() => setSettingsOpen(true)}
      />
      <main className="mx-auto max-w-5xl px-4 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-4">
        {content}
        {activeTab === "practice" ? <div className="mt-4"><PitchMeter note={selectedNote} /></div> : null}
      </main>
      <BottomTabs activeTab={activeTab} onChange={setActiveTab} />
      {settingsOpen ? <SettingsView settings={settings} onChange={updateSettings} onReset={resetData} onClose={() => setSettingsOpen(false)} /> : null}
    </div>
  );
}
