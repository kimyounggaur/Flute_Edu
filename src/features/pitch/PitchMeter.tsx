import { Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";
import type { FluteNote } from "../../data/types";
import { freqOf } from "../../lib/music";

function autoCorrelate(buffer: Float32Array, sampleRate: number) {
  let rms = 0;
  for (const sample of buffer) rms += sample * sample;
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.01) return null;

  let bestOffset = -1;
  let bestCorrelation = 0;
  for (let offset = 32; offset < 1024; offset += 1) {
    let correlation = 0;
    for (let i = 0; i < 1024; i += 1) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation = 1 - correlation / 1024;
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }
  return bestCorrelation > 0.6 && bestOffset > 0 ? sampleRate / bestOffset : null;
}

export function PitchMeter({ note }: { note: FluteNote }) {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("마이크는 꺼져 있습니다.");
  const stopRef = useRef<() => void>();

  const start = async () => {
    try {
      setMessage("소리는 서버로 전송되지 않고 기기 안에서만 분석됩니다.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      const buffer = new Float32Array(analyser.fftSize);
      const target = freqOf(note.midi);
      let frame = 0;
      const tick = () => {
        analyser.getFloatTimeDomainData(buffer);
        const pitch = autoCorrelate(buffer, context.sampleRate);
        if (pitch) {
          const cents = Math.round(1200 * Math.log2(pitch / target));
          setMessage(Math.abs(cents) <= 20 ? `맞아요 · ${cents} cents` : Math.abs(cents) <= 50 ? `${cents > 0 ? "조금 높아요" : "조금 낮아요"} · ${cents} cents` : "다른 음에 가까워요.");
        } else {
          setMessage("조금 더 길고 안정적으로 불어보세요.");
        }
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
      stopRef.current = () => {
        window.cancelAnimationFrame(frame);
        stream.getTracks().forEach((track) => track.stop());
        context.close();
      };
      setActive(true);
    } catch {
      setMessage("마이크 권한이 없어도 운지 학습은 계속할 수 있습니다.");
      setActive(false);
    }
  };

  const stop = () => {
    stopRef.current?.();
    setActive(false);
    setMessage("마이크는 꺼져 있습니다.");
  };

  return (
    <section className="rounded-app border border-hair bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-black">마이크 피치 확인</h2>
          <p className="text-sm text-muted">{message}</p>
        </div>
        <button type="button" onClick={active ? stop : start} className="grid size-12 place-items-center rounded-full bg-ink text-white" aria-label={active ? "마이크 끄기" : "마이크 켜기"}>
          {active ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
    </section>
  );
}
