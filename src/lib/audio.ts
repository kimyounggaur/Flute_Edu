import type { FluteNote } from "../data/types";
import { freqOf } from "./music";

type AudioStatus = "locked" | "loading" | "ready" | "fallback" | "muted" | "error";

interface PlayOptions {
  muted?: boolean;
  volume?: number;
  duration?: number;
}

let audioContext: AudioContext | undefined;
let soundfont: { start: (sample: { note: string; duration?: number; velocity?: number }) => unknown; loaded?: () => Promise<unknown> } | undefined;
let status: AudioStatus = "locked";

function getContext() {
  audioContext ??= new AudioContext();
  return audioContext;
}

export function getAudioStatus() {
  return status;
}

export async function unlockAudio() {
  const context = getContext();
  status = "loading";
  await context.resume();
  try {
    const { Soundfont } = await import("smplr");
    soundfont = new Soundfont(context, {
      instrument: "flute",
      kit: "FluidR3_GM",
      volume: 0.8,
    }) as typeof soundfont;
    await soundfont?.loaded?.();
    status = "ready";
  } catch {
    status = "fallback";
  }
  return status;
}

export function playFallbackTone(note: FluteNote, { volume = 0.7, duration = 1.2 }: PlayOptions = {}) {
  const context = getContext();
  const now = context.currentTime;
  const output = context.createGain();
  const filter = context.createBiquadFilter();
  const sine = context.createOscillator();
  const triangle = context.createOscillator();
  const sineGain = context.createGain();
  const triangleGain = context.createGain();
  const frequency = freqOf(note.midi);

  sine.type = "sine";
  triangle.type = "triangle";
  sine.frequency.value = frequency;
  triangle.frequency.value = frequency * 2;
  filter.type = "lowpass";
  filter.frequency.value = 2100;
  sineGain.gain.value = 0.82;
  triangleGain.gain.value = 0.12;
  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.34), now + 0.08);
  output.gain.setValueAtTime(Math.max(0.0001, volume * 0.28), now + duration * 0.72);
  output.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.3);

  sine.connect(sineGain).connect(filter);
  triangle.connect(triangleGain).connect(filter);
  filter.connect(output).connect(context.destination);
  sine.start(now);
  triangle.start(now);
  sine.stop(now + duration + 0.35);
  triangle.stop(now + duration + 0.35);
}

export async function playNote(note: FluteNote, options: PlayOptions = {}) {
  if (options.muted) {
    status = "muted";
    return status;
  }
  if (!audioContext || audioContext.state !== "running") {
    await unlockAudio();
  }
  try {
    soundfont?.start({ note: note.id, duration: options.duration ?? 1.2, velocity: Math.max(1, Math.round((options.volume ?? 0.7) * 100)) });
    if (!soundfont) playFallbackTone(note, options);
  } catch {
    playFallbackTone(note, options);
    status = "fallback";
  }
  return status;
}
