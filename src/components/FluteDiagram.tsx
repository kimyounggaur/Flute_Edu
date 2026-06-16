import { memo, useId, useMemo } from "react";
import { motion } from "framer-motion";
import type { KeyId } from "../data/types";
import { KEY_ORDER } from "../lib/music";

type KeySpec = {
  x: number;
  y: number;
  r: number;
};

export const KEY_POS: Record<KeyId, KeySpec> = {
  bFoot: { x: 30, y: 0, r: 7.2 },
  cFoot: { x: 55, y: 0, r: 7 },
  csFoot: { x: 80, y: 0, r: 6.8 },
  gizmo: { x: 83, y: -18, r: 4.8 },
  thumbBb: { x: 96, y: 25, r: 6.4 },
  thumbB: { x: 119, y: 27, r: 6.6 },
  rh3: { x: 112, y: 0, r: 8.4 },
  rh2: { x: 139, y: 0, r: 8.6 },
  rh1: { x: 166, y: 0, r: 8.7 },
  eb: { x: 159, y: 25, r: 6.4 },
  lh3: { x: 194, y: 0, r: 8.8 },
  lh2: { x: 222, y: 0, r: 8.8 },
  lh1: { x: 250, y: 0, r: 8.8 },
  gs: { x: 258, y: 25, r: 6.4 },
  dTrill: { x: 274, y: -22, r: 4.9 },
  dSharpTrill: { x: 296, y: -22, r: 4.9 },
};

const VISIBLE_LABEL: Record<KeyId, string> = {
  thumbBb: "B♭",
  thumbB: "T",
  lh1: "1",
  lh2: "2",
  lh3: "3",
  gs: "G#",
  rh1: "R1",
  rh2: "R2",
  rh3: "R3",
  dTrill: "Tr",
  dSharpTrill: "D#",
  eb: "Eb",
  csFoot: "C#",
  cFoot: "C",
  bFoot: "B",
  gizmo: "Gz",
};

const ARIA_LABEL: Record<KeyId, string> = {
  thumbBb: "왼손 엄지 B플랫 레버",
  thumbB: "왼손 엄지 B 키",
  lh1: "왼손 검지 키",
  lh2: "왼손 중지 키",
  lh3: "왼손 약지 키",
  gs: "왼손 새끼 G샵 레버",
  rh1: "오른손 검지 키",
  rh2: "오른손 중지 키",
  rh3: "오른손 약지 키",
  dTrill: "D 트릴 키",
  dSharpTrill: "D샵 트릴 키",
  eb: "오른손 새끼 E플랫 레버",
  csFoot: "풋조인트 C샵 키",
  cFoot: "풋조인트 C 키",
  bFoot: "풋조인트 B 키",
  gizmo: "기즈모 키",
};

const TUBE_LENGTH = 330;

const RINGS = [6, 224, 258, 322];
const TOP_RODS = [
  { x1: 52, x2: 178, y: -18 },
  { x1: 168, x2: 262, y: -17 },
];
const LOWER_RODS = [
  { x1: 24, x2: 170, y: 18 },
  { x1: 180, x2: 266, y: 18 },
];
const POST_X = [46, 71, 100, 128, 154, 181, 209, 236, 262];

export interface FluteDiagramProps {
  pressed: KeyId[];
  onToggleKey?: (key: KeyId) => void;
  scale?: number;
  showLabels?: boolean;
  glowKeys?: KeyId[];
  vertical?: boolean;
  className?: string;
}

function FluteDiagramBase({ pressed, onToggleKey, scale = 1, showLabels = false, glowKeys = [], vertical = false, className = "" }: FluteDiagramProps) {
  const rawId = useId().replace(/:/g, "");
  const pressedSet = useMemo(() => new Set(pressed), [pressed]);
  const glowSet = useMemo(() => new Set(glowKeys), [glowKeys]);
  const layout = vertical
    ? { viewBox: "-10 -10 200 380", originX: 58, originY: 342, angle: -78 }
    : { viewBox: "-24 -12 440 196", originX: 18, originY: 138, angle: -17 };

  const tubeGradientId = `tube-metal-${rawId}`;
  const keyGradientId = `key-cup-${rawId}`;
  const pressedGradientId = `pressed-cup-${rawId}`;
  const plateGradientId = `embouchure-plate-${rawId}`;
  const glowId = `key-glow-${rawId}`;
  const shadowId = `flute-shadow-${rawId}`;

  const toggle = (key: KeyId) => {
    if (!onToggleKey) return;
    navigator.vibrate?.(10);
    onToggleKey(key);
  };

  return (
    <div className={className} style={{ width: `${scale * 100}%`, maxWidth: "100%" }}>
      <svg viewBox={layout.viewBox} role="img" aria-label="플루트 운지 다이어그램" className="h-auto w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={tubeGradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f7fbfc" />
            <stop offset="16%" stopColor="#cfe0e5" />
            <stop offset="42%" stopColor="#8fa9b0" />
            <stop offset="68%" stopColor="#536e76" />
            <stop offset="100%" stopColor="#dcecf0" />
          </linearGradient>
          <radialGradient id={keyGradientId} cx="34%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#fbffff" />
            <stop offset="48%" stopColor="#d6e7eb" />
            <stop offset="100%" stopColor="#8ca2aa" />
          </radialGradient>
          <radialGradient id={pressedGradientId} cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#56616f" />
            <stop offset="72%" stopColor="#252d38" />
            <stop offset="100%" stopColor="#121822" />
          </radialGradient>
          <linearGradient id={plateGradientId} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#eef8fb" />
            <stop offset="52%" stopColor="#c7dde3" />
            <stop offset="100%" stopColor="#f9ffff" />
          </linearGradient>
          <filter id={glowId} x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={shadowId} x="-20%" y="-80%" width="150%" height="260%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#33414a" floodOpacity="0.18" />
          </filter>
        </defs>

        <g transform={`translate(${layout.originX} ${layout.originY}) rotate(${layout.angle})`} filter={`url(#${shadowId})`}>
          <line x1="0" y1="0" x2={TUBE_LENGTH} y2="0" stroke="#dcecf0" strokeWidth="34" strokeLinecap="round" />
          <line x1="2" y1="0" x2={TUBE_LENGTH - 2} y2="0" stroke={`url(#${tubeGradientId})`} strokeWidth="26" strokeLinecap="round" />
          <line x1="8" y1="-8" x2={TUBE_LENGTH - 8} y2="-8" stroke="#f9ffff" strokeWidth="5" strokeLinecap="round" opacity="0.72" />
          <line x1="10" y1="7" x2={TUBE_LENGTH - 12} y2="7" stroke="#334d55" strokeWidth="5" strokeLinecap="round" opacity="0.38" />

          {RINGS.map((x) => (
            <g key={x}>
              <line x1={x} y1="-17" x2={x} y2="17" stroke="#e7f5f8" strokeWidth="7" strokeLinecap="round" />
              <line x1={x + 1.8} y1="-14" x2={x + 1.8} y2="14" stroke="#9db3ba" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
            </g>
          ))}

          <ellipse cx="316" cy="-22" rx="16" ry="25" fill={`url(#${plateGradientId})`} stroke="#c0d6dc" strokeWidth="1.2" />
          <ellipse cx="317" cy="-22" rx="5.5" ry="9.5" fill="#1f1f24" transform="rotate(8 317 -22)" />
          <line x1="274" y1="-16" x2="327" y2="-16" stroke="#eef8fb" strokeWidth="4" strokeLinecap="round" opacity="0.85" />

          {TOP_RODS.map((rod) => (
            <line key={`${rod.x1}-${rod.x2}-${rod.y}`} x1={rod.x1} y1={rod.y} x2={rod.x2} y2={rod.y} stroke="#e8f6f9" strokeWidth="4" strokeLinecap="round" />
          ))}
          {LOWER_RODS.map((rod) => (
            <line key={`${rod.x1}-${rod.x2}-${rod.y}`} x1={rod.x1} y1={rod.y} x2={rod.x2} y2={rod.y} stroke="#d5e9ee" strokeWidth="3.5" strokeLinecap="round" />
          ))}
          {POST_X.map((x) => (
            <line key={x} x1={x} y1="-18" x2={x} y2="18" stroke="#dff0f4" strokeWidth="3.2" strokeLinecap="round" />
          ))}

          <path d="M96 27 C88 37 75 35 73 23 C81 28 88 26 94 18 Z" fill="#d4e8ee" stroke="#a8c0c8" strokeWidth="1" />
          <path d="M156 25 C166 39 183 34 186 20 C176 28 167 26 160 16 Z" fill="#d4e8ee" stroke="#a8c0c8" strokeWidth="1" />

          {KEY_ORDER.map((key) => {
            const { x, y, r } = KEY_POS[key];
            const isPressed = pressedSet.has(key);
            const isGlow = glowSet.has(key);
            const hitRadius = Math.max(15, r + 8);
            const stemY = y < -5 ? -17 : y > 5 ? 17 : 0;
            const labelY = y > 8 ? y + r + 11 : y < -8 ? y - r - 8 : y + r + 12;

            return (
              <g
                key={key}
                role={onToggleKey ? "button" : "switch"}
                tabIndex={onToggleKey ? 0 : -1}
                aria-label={`${ARIA_LABEL[key]} ${isPressed ? "눌림" : "열림"}`}
                aria-pressed={isPressed}
                onClick={() => toggle(key)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle(key);
                  }
                }}
                className={onToggleKey ? "cursor-pointer" : undefined}
              >
                {Math.abs(y) > 5 ? <line x1={x} y1={stemY} x2={x} y2={y} stroke="#d9edf1" strokeWidth="3" strokeLinecap="round" /> : null}
                {isGlow ? <circle cx={x} cy={y} r={hitRadius - 2} fill="var(--hl)" opacity="0.3" filter={`url(#${glowId})`} /> : null}
                <circle cx={x + 1.2} cy={y + 1.5} r={r + 2.2} fill="#425b64" opacity="0.22" />
                <circle cx={x} cy={y} r={r + 2.2} fill="#edf8fa" stroke="#9fb6bd" strokeWidth="1.2" />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isPressed ? Math.max(3, r - 1.1) : Math.max(3, r - 2.3)}
                  fill={isPressed ? `url(#${pressedGradientId})` : `url(#${keyGradientId})`}
                  stroke={isPressed ? "#17202b" : "#a7bbc1"}
                  strokeWidth={isPressed ? 1.4 : 1}
                  initial={false}
                  animate={{ scale: isPressed ? 0.92 : 1 }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
                {!isPressed ? <ellipse cx={x - r * 0.25} cy={y - r * 0.35} rx={r * 0.34} ry={r * 0.2} fill="#ffffff" opacity="0.75" /> : null}
                {showLabels ? (
                  <text
                    x={x}
                    y={labelY}
                    transform={`rotate(${-layout.angle} ${x} ${labelY})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={key === "dSharpTrill" ? 4.9 : 5.8}
                    fontWeight="800"
                    fill={isPressed ? "var(--ink)" : "var(--ink-2)"}
                    pointerEvents="none"
                  >
                    {VISIBLE_LABEL[key]}
                  </text>
                ) : null}
                <circle data-testid={`hitbox-${key}`} cx={x} cy={y} r={hitRadius} fill="transparent" pointerEvents="all" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export const FluteDiagram = memo(FluteDiagramBase);
