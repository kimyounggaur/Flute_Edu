import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type { KeyId } from "../data/types";
import { KEY_ORDER } from "../lib/music";

export const KEY_POS: Record<KeyId, [number, number, number]> = {
  thumbBb: [30, 82, 6.5],
  thumbB: [48, 82, 6.5],
  lh1: [72, 50, 9.5],
  lh2: [96, 50, 9.5],
  lh3: [120, 50, 9.5],
  gs: [126, 78, 6.5],
  rh1: [174, 50, 9.5],
  rh2: [204, 50, 9.5],
  rh3: [234, 50, 9.5],
  dTrill: [189, 27, 4.5],
  dSharpTrill: [219, 27, 4.5],
  eb: [240, 78, 6.5],
  csFoot: [252, 50, 5.5],
  cFoot: [266, 50, 5.5],
  bFoot: [280, 50, 5.5],
  gizmo: [280, 30, 4],
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
  thumbBb: "왼손 엄지 B♭ 레버",
  thumbB: "왼손 엄지 B 키",
  lh1: "왼손 검지",
  lh2: "왼손 중지",
  lh3: "왼손 약지",
  gs: "왼손 새끼 G♯ 키",
  rh1: "오른손 검지",
  rh2: "오른손 중지",
  rh3: "오른손 약지",
  dTrill: "D 트릴 키",
  dSharpTrill: "D♯ 트릴 키",
  eb: "오른손 새끼 E♭ 키",
  csFoot: "저음 C♯ 풋키",
  cFoot: "저음 C 풋키",
  bFoot: "저음 B 풋키",
  gizmo: "기즈모 키",
};

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
  const pressedSet = useMemo(() => new Set(pressed), [pressed]);
  const glowSet = useMemo(() => new Set(glowKeys), [glowKeys]);
  const transform = vertical ? "rotate(90 150 58)" : undefined;

  const toggle = (key: KeyId) => {
    if (!onToggleKey) return;
    navigator.vibrate?.(10);
    onToggleKey(key);
  };

  return (
    <div className={className} style={{ width: `${scale * 100}%`, maxWidth: "100%" }}>
      <svg viewBox="0 0 300 116" role="img" aria-label="플루트 운지 다이어그램" className="h-auto w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="tubeGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--tube)" />
            <stop offset="60%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="var(--tube-line)" />
          </linearGradient>
          <filter id="keyGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={transform}>
          <rect x="2" y="43" width="286" height="14" rx="7" fill="url(#tubeGradient)" stroke="var(--tube-line)" strokeWidth="1.2" />
          <line x1="2" y1="50" x2="288" y2="50" stroke="#d6d9dd" strokeWidth="0.8" opacity="0.8" />
          <ellipse cx="18" cy="50" rx="13" ry="22" fill="#fff" stroke="var(--tube-line)" strokeWidth="1.5" />
          <line x1="147" y1="29" x2="147" y2="89" stroke="var(--brass)" strokeDasharray="3 3" strokeWidth="1" opacity="0.75" />

          {KEY_ORDER.map((key) => {
            const [cx, cy, r] = KEY_POS[key];
            const isPressed = pressedSet.has(key);
            const isGlow = glowSet.has(key);
            const needsStem = cy !== 50;
            const hitRadius = Math.max(15, r + 9);
            const labelY = cy > 50 ? cy + r + 10 : cy < 50 ? cy - r - 5 : cy + 4;

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
                {needsStem ? <line x1={cx} y1="50" x2={cx} y2={cy} stroke="var(--tube-line)" strokeWidth="1.2" /> : null}
                {isGlow ? <circle cx={cx} cy={cy} r={hitRadius - 3} fill="var(--hl)" opacity="0.25" filter="url(#keyGlow)" /> : null}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isPressed ? r + 1.2 : r}
                  fill={isPressed ? "var(--ink)" : "#fff"}
                  stroke={isPressed ? "var(--ink)" : "var(--tube-line)"}
                  strokeWidth={isPressed ? 1.4 : 1.8}
                  opacity={!isPressed && (key === "dTrill" || key === "dSharpTrill" || key === "gizmo") ? 0.72 : 1}
                  initial={false}
                  animate={{ scale: isPressed ? 0.94 : 1 }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {showLabels ? (
                  <text
                    x={cx}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={key === "dSharpTrill" ? 4.8 : 5.6}
                    fontWeight="700"
                    fill={isPressed ? "var(--ink)" : "var(--ink-2)"}
                    pointerEvents="none"
                  >
                    {VISIBLE_LABEL[key]}
                  </text>
                ) : null}
                <circle data-testid={`hitbox-${key}`} cx={cx} cy={cy} r={hitRadius} fill="transparent" pointerEvents="all" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export const FluteDiagram = memo(FluteDiagramBase);
