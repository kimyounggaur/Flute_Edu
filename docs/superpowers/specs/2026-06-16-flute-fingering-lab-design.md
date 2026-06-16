# Flute Fingering Lab Design

**Source of truth:** `플룻_운지법_배우기_웹앱_바이브코딩_프롬프트_통합본.md`

The user has explicitly approved autonomous execution without follow-up questions. This document records the approved design in implementation terms.

## Product

Build a mobile-first React app named "플루트 핑거링 랩" for beginning flute learners. The core flow connects solfege, scientific pitch names, staff notation, flute fingering, and playable sound on one screen.

## Architecture

Use Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand persist, VexFlow, smplr, and Web Audio fallback. Static fingering data in `src/data/notes.ts` is the single source of truth for all diagrams, tokens, reverse matching, steps, search aliases, quiz answers, and practice playback.

## Screens

The app uses a fixed bottom tab bar with Home, Explore, Learn, Practice, and Quiz. Explore is the primary screen: learners select a note, see the flute diagram, read note/solfege/frequency/tip details, step through key presses, reverse-search a fingering by tapping keys, play sound, and jump from staff slots.

## Data And Rules

The data covers B3 through C7 for standard Boehm closed-G-sharp C flute. B3 and the C7 gizmo variant require B foot. D4 and D5 omit E-flat. B-flat notes expose both thumb B-flat and 1+1 alternates. C7 exposes C-foot and B-foot plus gizmo alternates. No fingering outside the approved data is invented.

## Verification

Automated tests cover the data invariants, frequency calculation, solfege/search helpers, reverse fingering matching, settings persistence guardrails, and practice data integrity. Browser verification checks the mobile layout, SVG rendering, tab navigation, and key Explore interactions.
