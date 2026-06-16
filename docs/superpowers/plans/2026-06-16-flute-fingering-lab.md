# Flute Fingering Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved mobile-first flute fingering learning app from the provided Markdown spec and `01 Source` materials.

**Architecture:** A Vite React SPA keeps fingering data static and derives all display, search, reverse matching, practice, quiz, and settings behavior from that data. UI is organized into focused feature components under `src/features`, shared components under `src/components`, and pure logic under `src/lib`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand persist, lucide-react, VexFlow, smplr, Vitest, Testing Library, PWA manifest/service worker.

---

### Task 1: Scaffolding And Tooling

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`
- Create: `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/test/setup.ts`
- Create: `public/manifest.webmanifest`, `public/sw.js`

- [ ] Create a Vite React TypeScript app in the current folder.
- [ ] Install production dependencies: `@vitejs/plugin-react`, `@smplrjs/audio`, `framer-motion`, `lucide-react`, `vexflow`, `zustand`, `tailwindcss`, `postcss`, `autoprefixer`.
- [ ] Install dev dependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- [ ] Add scripts: `dev`, `build`, `preview`, `test`, `test:run`.
- [ ] Add design tokens, safe-area padding, reduced-motion CSS, and mobile layout constraints.
- [ ] Run `npm test -- --run` and expect an empty suite or initial pass after setup.

### Task 2: Data And Pure Music Logic

**Files:**
- Create: `src/data/types.ts`, `src/data/notes.ts`, `src/data/practice.ts`
- Create: `src/lib/music.ts`, `src/lib/fingering.ts`
- Test: `src/lib/music.test.ts`, `src/lib/fingering.test.ts`, `src/data/notes.test.ts`

- [ ] Write failing tests for C4 frequency, D4 omitting E-flat, B-flat alternate fingerings, C7 variants, B3 B-foot requirement, search aliases for `시b`, `라#`, `do4`, and exact reverse matching.
- [ ] Add the approved A-8, A-9, A-9-2, and C-3 data and helpers.
- [ ] Run the tests and make them pass.

### Task 3: App Shell And Persistent State

**Files:**
- Create: `src/store/appStore.ts`
- Create: `src/components/BottomTabs.tsx`, `src/components/TopControls.tsx`, `src/components/SegmentedControl.tsx`
- Test: `src/store/appStore.test.ts`

- [ ] Write failing tests for default settings and defensive persistence behavior.
- [ ] Implement tabs, register/display-mode/key-mode settings, C-foot/B-foot settings, beginner mode, volume, mute, reduced motion, progress, and reset.
- [ ] Run state and shell tests.

### Task 4: Flute Diagram And Staff

**Files:**
- Create: `src/components/FluteDiagram.tsx`, `src/components/Staff.tsx`
- Test: `src/components/FluteDiagram.test.tsx`

- [ ] Write failing component tests that verify G4 pressed keys, transparent hitboxes, labels, and toggle callbacks.
- [ ] Implement the SVG using `KEY_POS`, memoization, Framer Motion key state, labels, stems, tube, lip plate, hand divider, and expanded hitboxes.
- [ ] Implement VexFlow staff rendering with tap slots from C4 to C7.
- [ ] Run component tests.

### Task 5: Explore, Search, Audio, And Reverse Mode

**Files:**
- Create: `src/lib/audio.ts`
- Create: `src/features/explore/ExploreView.tsx`, `src/features/explore/NoteChips.tsx`, `src/features/explore/NoteInfo.tsx`, `src/features/explore/ReverseFinder.tsx`, `src/features/explore/StickyActions.tsx`
- Test: `src/features/explore/ExploreView.test.tsx`

- [ ] Write failing tests for note selection, display toggle, alternate fingering switch, reverse matching, and search result selection.
- [ ] Implement note chips, search normalization, staff integration, key-step view, reverse fingering mode, sticky actions, swipe next/previous, audio unlock, smplr lazy load, Web Audio fallback, mute, and haptics.
- [ ] Run Explore tests.

### Task 6: Home, Learn, Practice, Quiz, Pitch, Settings

**Files:**
- Create: `src/features/home/HomeView.tsx`, `src/features/learn/LearnView.tsx`, `src/features/practice/PracticeView.tsx`, `src/features/quiz/QuizView.tsx`, `src/features/settings/SettingsView.tsx`, `src/features/pitch/PitchMeter.tsx`
- Test: `src/features/practice/practice.test.ts`, `src/features/quiz/quiz.test.ts`

- [ ] Write failing tests for practice sequence progression, BPM duration mapping, quiz question generation, scoring, and missed-note recap.
- [ ] Implement Home daily notes, Learn cards, Practice playback/step mode, Quiz three question types, optional local pitch meter, Settings, onboarding, empty/loading/error states.
- [ ] Run feature tests.

### Task 7: PWA, Assets, README, And Verification

**Files:**
- Modify: `public/manifest.webmanifest`, `public/sw.js`, `src/styles.css`
- Create: `README.md`
- Copy/source-use: image assets from `01 Source`

- [ ] Use provided source images as local visual assets where helpful without making the first screen a marketing landing page.
- [ ] Finish PWA installability, offline shell cache, accessibility labels, focus rings, reduced motion, and responsive portrait/landscape polish.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run build`.
- [ ] Start `npm run dev -- --host 127.0.0.1`, open the app in Browser, and verify desktop plus 390px mobile screenshots for nonblank rendering, tab switching, Explore flow, SVG key states, and layout fit.
