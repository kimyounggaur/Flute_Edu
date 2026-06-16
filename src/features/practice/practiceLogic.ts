export function getStepDurationMs(bpm: number, dur: number) {
  const safeBpm = Math.max(30, Math.min(180, bpm));
  return Math.round((60_000 / safeBpm) * dur);
}

export function advancePracticeIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index + 1) % length;
}

export function previousPracticeIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index - 1 + length) % length;
}

export function practiceProgress(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.round(((index + 1) / length) * 1000) / 10;
}
