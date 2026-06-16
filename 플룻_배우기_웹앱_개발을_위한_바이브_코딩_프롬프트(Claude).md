# 플루트 운지 · 계이름 학습 웹앱 — 바이브코딩 프롬프트 설계서

> **무엇인가요?** 초보자가 플루트 운지법과 계이름(도레미)을 가장 직관적으로 익히도록 돕는 웹앱을, AI 코딩 도구로 단계별로 만들 수 있게 설계한 **프롬프트 모음집**입니다.
>
> **어디에 붙여넣나요?** Cursor · Claude Code · v0 · Lovable · Bolt.new 등 어떤 바이브코딩 도구에도 사용할 수 있습니다.
>
> **사용 순서**
> 1. **PART A(마스터 컨텍스트)** 전체를 가장 먼저 한 번 붙여넣어 프로젝트의 토대를 잡습니다.
> 2. 그다음 **PART B의 Phase를 하나씩** 순서대로 붙여넣고, 각 단계의 *완료 기준*을 만족하는지 확인한 뒤 다음 단계로 넘어갑니다.
> 3. **PART C(부록)** 의 데이터(운지표·연습곡)는 필요할 때 해당 Phase 프롬프트에 함께 첨부합니다.
>
> 핵심 원칙: **한 번에 다 만들지 말고, 한 단계씩 만들고 → 눌러보고 → 다음 단계.** 이것이 바이브코딩에서 품질을 가장 크게 끌어올립니다.

---

## 목차
- [PART A — 마스터 컨텍스트 프롬프트](#part-a--마스터-컨텍스트-프롬프트)
  - [A-1. 역할과 목표](#a-1-역할과-목표)
  - [A-2. 제품 비전과 5대 UX 원칙](#a-2-제품-비전과-5대-ux-원칙)
  - [A-3. 타깃 사용자와 학습 목표](#a-3-타깃-사용자와-학습-목표)
  - [A-4. 기술 스택](#a-4-기술-스택)
  - [A-5. 정보구조(IA)와 화면 구성](#a-5-정보구조ia와-화면-구성)
  - [A-6. 디자인 시스템](#a-6-디자인-시스템)
  - [A-7. 반드시 지켜야 할 음악적 정확성 규칙](#a-7-반드시-지켜야-할-음악적-정확성-규칙)
  - [A-8. 데이터 모델(TypeScript)](#a-8-데이터-모델typescript)
  - [A-9. 검증된 운지 데이터(전체)](#a-9-검증된-운지-데이터전체--이-앱의-정답-데이터)
  - [A-10. 플루트 SVG 다이어그램 사양](#a-10-플루트-svg-다이어그램-사양)
- [PART B — 단계별 빌드 프롬프트](#part-b--단계별-빌드-프롬프트)
- [PART C — 부록](#part-c--부록)

---

# PART A — 마스터 컨텍스트 프롬프트

> 아래 A-1 ~ A-10을 **통째로 한 번** 붙여넣으세요. (이미 코드베이스가 있다면 "다음 사양을 우리 프로젝트의 기준 문서로 삼아 줘"라고 덧붙입니다.)

## A-1. 역할과 목표

당신은 **음악 교육 경험이 있는 시니어 프론트엔드 엔지니어 겸 인터랙션 디자이너**입니다. 플루트를 처음 배우는 사람이 **운지법(어떤 키를 누르는가)** 과 **계이름(도레미)** 을 가장 직관적으로 익히도록 돕는 모바일 우선 웹앱을 만듭니다. 학습 콘텐츠의 **음악적 정확성**(A-7, A-9)은 절대 타협하지 않습니다. 추측으로 운지를 만들지 말고, 제공된 데이터만 사용하세요.

## A-2. 제품 비전과 5대 UX 원칙

한 문장 비전: **"음을 고르면, 누를 키가 악기 그림 위에 즉시 빛나고 소리까지 들린다."**

1. **보이는 것이 먼저(Visual-first).** 글보다 큰 플루트 그림과 색으로 설명한다. 텍스트는 보조.
2. **즉각 피드백(Instant feedback).** 음을 누르면 0.1초 안에 운지 하이라이트 + 실음 재생.
3. **점진적 공개(Progressive disclosure).** 초보 화면은 단순하게. 트릴키·대체운지 같은 고급 정보는 펼치기로 숨긴다.
4. **한 손 모바일(One-thumb mobile).** 보면대에 폰을 세워 두고 한 손으로 쓰는 상황 기준. 탭 영역은 최소 44×44px, 하단 탭 내비게이션.
5. **연결해서 가르치기(Connect concepts).** 오선보 위 음표 ↔ 음이름(C·D·E) ↔ 계이름(도·레·미) ↔ 운지 ↔ 소리를 항상 한 화면에서 연결해 보여 준다.

## A-3. 타깃 사용자와 학습 목표

- **주 사용자:** 플루트를 처음 배우는 청소년·성인, 학교 방과후/동아리 학습자, 독학자.
- **학습 목표(앱이 끝났을 때 사용자가 할 수 있어야 하는 것)**
  1. C4(가온다)~C7 음역에서 임의의 음의 운지를 안다.
  2. 음이름과 계이름의 관계(고정도법 기준 C=도)를 이해한다.
  3. 오선보에 적힌 음을 보고 이름과 운지를 떠올린다.
  4. 간단한 동요(작은별 등)를 운지 가이드를 따라 처음부터 끝까지 분다.

## A-4. 기술 스택

- **프레임워크:** React 18 + TypeScript + **Vite**. (Next.js를 써도 좋지만 단일 페이지로 충분하니 Vite 권장.)
- **스타일:** **Tailwind CSS** + CSS 변수 기반 디자인 토큰(A-6).
- **애니메이션:** **Framer Motion** (키 눌림, 화면 전환, 정답 피드백).
- **오디오(실음 재생):** **`smplr`** 라이브러리의 Soundfont 플루트 음색을 1순위로 사용
  ```ts
  import { Soundfont } from "smplr";
  const ctx = new AudioContext();
  const flute = new Soundfont(ctx, { instrument: "flute" });
  await flute.load;
  flute.start({ note: "C4", duration: 1.2 }); // smplr은 과학적 음높이 표기를 그대로 받음
  ```
  네트워크 없이 동작해야 하면 **Tone.js** 의 신디사이저(삼각파 + 약한 비브라토 + 미세 노이즈)로 플루트 비슷한 대체 음색을 만든다.
- **오선보 렌더링:** **VexFlow** (높은음자리표·음표·임시표 그리기).
- **상태/저장:** 가벼운 전역 상태는 **Zustand**, 학습 진도는 `localStorage`.
- **아이콘:** `lucide-react`.
- **폰트:** 한글 가독성을 위해 **Pretendard**(본문/UI), 음 이름 등 큰 표시는 같은 폰트의 굵은 웨이트.

> 의존성을 최소화하되, 오디오(smplr/Tone)와 오선보(VexFlow)는 직접 구현하지 말고 위 라이브러리를 사용하세요.

## A-5. 정보구조(IA)와 화면 구성

하단 탭 4개로 구성합니다.

1. **운지 탐색(Explore)** — 핵심 화면. 음을 고르면 플루트 그림에 운지가 표시되고, 음이름/계이름/오선보/소리를 함께 보여 준다.
2. **배우기(Learn)** — 짧은 레슨 카드: ① 플루트 잡는 법·키 이름 ② 음이름 vs 계이름 ③ 첫 5음(솔라시도레 등) ④ 옥타브 개념. 그림 위주, 1카드 = 1개념.
3. **연습(Practice)** — ① 스케일 따라불기(C장조 등) ② 동요 따라불기(C-2 데이터) — 음표가 하나씩 진행되며 운지가 자동으로 바뀐다.
4. **퀴즈(Quiz)** — 게임형: "이 음의 운지는?" / "이 운지는 무슨 음?" / "오선보의 이 음표 이름은?" 정답률·연속 정답(스트릭) 표시.

상단에는 항상 **음역 선택 토글(저·중·고음역)** 과 **표기 토글(음이름 / 계이름 / 둘 다)** 을 둔다.

## A-6. 디자인 시스템

따뜻한 종이 느낌 배경 + 차분한 잉크색 + 황동(brass) 포인트. CSS 변수로 정의하고 Tailwind에서 사용하세요.

```css
:root{
  --paper:#f7f6f3;      /* 페이지 배경 */
  --card:#ffffff;       /* 카드 */
  --ink:#2a3342;        /* 주 텍스트 · 눌린 키 */
  --ink-2:#6b7280;      /* 보조 텍스트 */
  --brass:#9a6b3f;      /* 강조(제목·옥타브·포인트) */
  --tube:#ecedef;       /* 플루트 관 */
  --tube-line:#c7ccd1;  /* 관 테두리 · 열린 키 보조선 */
  --hair:#e3e1db;       /* 카드 경계선 */
  --ok:#2f8f6b;         /* 정답 */
  --warn:#c2543d;       /* 오답 */
  --hl:#f3c969;         /* 진행 중 음표 하이라이트(은은한 황금) */
  --radius:14px;
}
```

- **타이포:** Pretendard. 음 이름 표시는 28~34px / 800, 보조 라벨 11~13px / `--ink-2`.
- **키 표현 규칙(가장 중요):** **누르는 키 = 꽉 찬 원(`--ink`)**, **안 누르는 키 = 흰 원 + 테두리.** 이 한 가지 규칙을 앱 전체에서 일관되게.
- **모바일 우선:** 기준 폭 360–430px. 플루트 그림은 가로로 길어 화면 폭에 맞춰 스케일(필요하면 세로 회전 옵션). 하단 탭바.
- **모션:** 키 눌림은 `scale 0.92 → 1` + 색 채움(150ms). 정답은 초록 펄스, 오답은 좌우 흔들림. **`prefers-reduced-motion`을 반드시 존중**(모션 끄기).
- **접근성:** 색에만 의존하지 말고 눌린 키에는 채움+살짝 큰 반지름으로 형태 차이도 준다. 포커스 링 명확, 키보드 탐색 가능, 의미 있는 `aria-label`.

## A-7. 반드시 지켜야 할 음악적 정확성 규칙

이 앱은 **표준 베임(Boehm) 시스템 · 폐쇄 G♯(closed G#)** 플루트를 기준으로 한다. 다음을 반드시 지킨다.

1. **음역:** 표준 C풋 기준 **C4 ~ C7**. **B3** 는 B풋 조인트가 있어야 가능(앱에서 "B풋 전용"으로 표시).
2. **비이조 악기(non-transposing):** 플루트는 **기보음 = 실음**. **C4 = 가온다(middle C)** = 피아노 중앙 도. 과학적 음높이 표기(C4, D5 …)를 사용한다.
3. **E♭(D♯) 키는 기본 벤트:** 대부분의 음에서 오른손 새끼가 **E♭ 키를 누른 채로** 분다. 단, **D4·D5는 E♭ 키를 뗀다**(이게 D의 특징적 운지). 최저음 **B3·C4·C♯4** 와 일부 최고음(B♭6·B6·C7)도 E♭를 누르지 않는다. → 데이터(A-9)에 키가 명시된 대로만 표시할 것.
4. **B♭(A♯)는 운지가 두 가지:** ① **엄지 B♭ 레버(Briccialdi)** 사용(권장 기본) ② **오른손 검지(1+1)** 사용. 둘 다 보여 주되 기본값은 ①.
5. **C7도 두 가지:** ① **B풋 + 기즈모(gizmo) 키** ② **C풋(기즈모 없이)**. 둘 다 제공.
6. **F♯6 주의:** 엄지는 반드시 **B 내추럴 레버**를 쓴다(B♭ 레버 아님). 각주로 안내.
7. 추측 금지: 위 규칙과 A-9 데이터에 없는 운지를 만들어내지 말 것. 출처는 **The Woodwind Fingering Guide**.

## A-8. 데이터 모델(TypeScript)

```ts
// 16개 키 식별자 (플루트 그림의 각 키와 1:1로 매핑)
export type KeyId =
  | "thumbB" | "thumbBb"            // 왼손 엄지: B 내추럴 / B♭ 레버
  | "lh1" | "lh2" | "lh3" | "gs"    // 왼손 검지·중지·약지 / G♯
  | "rh1" | "rh2" | "rh3"           // 오른손 검지·중지·약지
  | "dTrill" | "dSharpTrill"        // D 트릴 / D♯ 트릴
  | "eb"                            // E♭(D♯) 키 (기본 벤트)
  | "csFoot" | "cFoot" | "bFoot"    // 풋 조인트: 저 C♯ / 저 C / 저 B
  | "gizmo";                        // 기즈모(고음 C 보조)

export interface Fingering {
  keys: KeyId[];          // 눌러야 하는 키 목록
  label?: string;         // 대체 운지 설명(예: "엄지 B♭ 레버", "오른손 검지(1+1)")
}

export interface FluteNote {
  id: string;                                   // "C4" (과학적 음높이, C4 = 가온다)
  letter: "C"|"D"|"E"|"F"|"G"|"A"|"B";          // 음이름(영문)
  accidental?: "sharp"|"flat";
  octave: number;                               // 4,5,6,7 (B3는 3)
  midi: number;                                 // 60 = C4
  enharmonic?: string;                          // 딴이름한소리(예: C♯4 ↔ D♭4)
  register: 1 | 2 | 3;                          // 저·중·고 음역(운지 패턴 기준)
  fingerings: Fingering[];                      // [0]이 기본 운지
  note?: string;                                // 표시용 각주
}

// 주파수는 MIDI에서 계산 (하드코딩하지 말 것)
export const freqOf = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
```

## A-9. 검증된 운지 데이터(전체) — 이 앱의 "정답 데이터"

> 아래 배열을 `src/data/notes.ts`로 그대로 사용하세요. **임의 수정 금지.** (계이름 라벨은 고정도법 = 다장조 기준. 조 변경 시 계산은 PART B Phase 4에서 다룸.)

```ts
import { FluteNote } from "./types";

export const NOTES: FluteNote[] = [
  // ── 제1옥타브 (저음역) B3 ~ C♯5 ──────────────────────────────
  { id:"B3",  letter:"B", octave:3, midi:59, register:1, note:"B풋 전용",
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","rh3","bFoot"] }] },
  { id:"C4",  letter:"C", octave:4, midi:60, register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","rh3","cFoot"] }] },
  { id:"C#4", letter:"C", accidental:"sharp", octave:4, midi:61, enharmonic:"D♭4", register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","rh3","csFoot"] }] },
  { id:"D4",  letter:"D", octave:4, midi:62, register:1, note:"E♭ 키 뗌",
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","rh3"] }] },
  { id:"Eb4", letter:"E", accidental:"flat", octave:4, midi:63, enharmonic:"D♯4", register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","rh3","eb"] }] },
  { id:"E4",  letter:"E", octave:4, midi:64, register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","eb"] }] },
  { id:"F4",  letter:"F", octave:4, midi:65, register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","eb"] }] },
  { id:"F#4", letter:"F", accidental:"sharp", octave:4, midi:66, enharmonic:"G♭4", register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh3","eb"] }] },
  { id:"G4",  letter:"G", octave:4, midi:67, register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","eb"] }] },
  { id:"G#4", letter:"G", accidental:"sharp", octave:4, midi:68, enharmonic:"A♭4", register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","gs","eb"] }] },
  { id:"A4",  letter:"A", octave:4, midi:69, register:1,
    fingerings:[{ keys:["thumbB","lh1","lh2","eb"] }] },
  { id:"Bb4", letter:"B", accidental:"flat", octave:4, midi:70, enharmonic:"A♯4", register:1,
    fingerings:[
      { keys:["thumbBb","lh1","eb"], label:"엄지 B♭ 레버(권장)" },
      { keys:["thumbB","lh1","rh1","eb"], label:"오른손 검지(1+1)" } ] },
  { id:"B4",  letter:"B", octave:4, midi:71, register:1,
    fingerings:[{ keys:["thumbB","lh1","eb"] }] },
  { id:"C5",  letter:"C", octave:5, midi:72, register:1,
    fingerings:[{ keys:["lh1","eb"] }] },
  { id:"C#5", letter:"C", accidental:"sharp", octave:5, midi:73, enharmonic:"D♭5", register:1,
    fingerings:[{ keys:["eb"] }] },

  // ── 제2옥타브 (중음역) D5 ~ C♯6 ──────────────────────────────
  { id:"D5",  letter:"D", octave:5, midi:74, register:2, note:"E♭ 키 뗌",
    fingerings:[{ keys:["thumbB","lh2","lh3","rh1","rh2","rh3"] }] },
  { id:"Eb5", letter:"E", accidental:"flat", octave:5, midi:75, enharmonic:"D♯5", register:2,
    fingerings:[{ keys:["thumbB","lh2","lh3","rh1","rh2","rh3","eb"] }] },
  { id:"E5",  letter:"E", octave:5, midi:76, register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","rh2","eb"] }] },
  { id:"F5",  letter:"F", octave:5, midi:77, register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh1","eb"] }] },
  { id:"F#5", letter:"F", accidental:"sharp", octave:5, midi:78, enharmonic:"G♭5", register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","rh3","eb"] }] },
  { id:"G5",  letter:"G", octave:5, midi:79, register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","eb"] }] },
  { id:"G#5", letter:"G", accidental:"sharp", octave:5, midi:80, enharmonic:"A♭5", register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","gs","eb"] }] },
  { id:"A5",  letter:"A", octave:5, midi:81, register:2,
    fingerings:[{ keys:["thumbB","lh1","lh2","eb"] }] },
  { id:"Bb5", letter:"B", accidental:"flat", octave:5, midi:82, enharmonic:"A♯5", register:2,
    fingerings:[
      { keys:["thumbBb","lh1","eb"], label:"엄지 B♭ 레버(권장)" },
      { keys:["thumbB","lh1","rh1","eb"], label:"오른손 검지(1+1)" } ] },
  { id:"B5",  letter:"B", octave:5, midi:83, register:2,
    fingerings:[{ keys:["thumbB","lh1","eb"] }] },
  { id:"C6",  letter:"C", octave:6, midi:84, register:2,
    fingerings:[{ keys:["lh1","eb"] }] },
  { id:"C#6", letter:"C", accidental:"sharp", octave:6, midi:85, enharmonic:"D♭6", register:2,
    fingerings:[{ keys:["eb"] }] },

  // ── 제3옥타브 (고음역) D6 ~ C7 ──────────────────────────────
  { id:"D6",  letter:"D", octave:6, midi:86, register:3,
    fingerings:[{ keys:["thumbB","lh2","lh3","eb"] }] },
  { id:"Eb6", letter:"E", accidental:"flat", octave:6, midi:87, enharmonic:"D♯6", register:3,
    fingerings:[{ keys:["thumbB","lh1","lh2","lh3","gs","rh1","rh2","rh3","eb"] }] },
  { id:"E6",  letter:"E", octave:6, midi:88, register:3,
    fingerings:[{ keys:["thumbB","lh1","lh2","rh1","rh2","eb"] }] },
  { id:"F6",  letter:"F", octave:6, midi:89, register:3,
    fingerings:[{ keys:["thumbB","lh1","lh3","rh1","eb"] }] },
  { id:"F#6", letter:"F", accidental:"sharp", octave:6, midi:90, enharmonic:"G♭6", register:3, note:"엄지 B 내추럴 레버 사용",
    fingerings:[{ keys:["thumbB","lh1","lh3","rh3","eb"] }] },
  { id:"G6",  letter:"G", octave:6, midi:91, register:3,
    fingerings:[{ keys:["lh1","lh2","lh3","eb"] }] },
  { id:"G#6", letter:"G", accidental:"sharp", octave:6, midi:92, enharmonic:"A♭6", register:3,
    fingerings:[{ keys:["lh2","lh3","gs","eb"] }] },
  { id:"A6",  letter:"A", octave:6, midi:93, register:3,
    fingerings:[{ keys:["thumbB","lh2","rh1","eb"] }] },
  { id:"Bb6", letter:"B", accidental:"flat", octave:6, midi:94, enharmonic:"A♯6", register:3, note:"D 트릴 키 사용",
    fingerings:[{ keys:["thumbB","rh1","dTrill"] }] },
  { id:"B6",  letter:"B", octave:6, midi:95, register:3, note:"D♯ 트릴 키 사용",
    fingerings:[{ keys:["thumbB","lh1","lh3","dSharpTrill"] }] },
  { id:"C7",  letter:"C", octave:7, midi:96, register:3,
    fingerings:[
      { keys:["lh1","lh2","lh3","gs","rh1","gizmo"], label:"B풋 + 기즈모" },
      { keys:["lh1","lh2","lh3","gs","rh1"], label:"C풋(기즈모 없이)" } ] },
];
```

## A-10. 플루트 SVG 다이어그램 사양

가로로 누운 플루트 한 대를 그린다. **왼쪽 = 헤드(입술판), 오른쪽 = 풋.** 좌표계는 `viewBox="0 0 300 116"` 기준이며, 아래 키 좌표 `(cx, cy, r)`를 그대로 쓰면 표준 운지 그림이 된다.

```ts
export const KEY_POS: Record<KeyId,[number,number,number]> = {
  thumbBb:[30,82,6.5], thumbB:[48,82,6.5],
  lh1:[72,50,9.5], lh2:[96,50,9.5], lh3:[120,50,9.5], gs:[126,78,6.5],
  rh1:[174,50,9.5], rh2:[204,50,9.5], rh3:[234,50,9.5],
  dTrill:[189,27,4.5], dSharpTrill:[219,27,4.5], eb:[240,78,6.5],
  csFoot:[252,50,5.5], cFoot:[266,50,5.5], bFoot:[280,50,5.5], gizmo:[280,30,4.0],
};
```

렌더 규칙:
- **관:** `x=2..288, y=43..57`(중심선 y=50), 둥근 모서리, 채움 `--tube` / 테두리 `--tube-line`.
- **입술판:** 헤드 끝(약 `cx=18, cy=50`)에 타원으로 표시.
- **손 구분선:** `x=147`에 점선(왼손/오른손 경계).
- **줄기(stem):** 관에서 벗어난 키(엄지·G♯·E♭ = 관 아래, 트릴·기즈모 = 관 위)는 가는 선으로 관과 연결.
- **키 상태:** `pressed` 키 = 채움 `--ink`; 그 외 = 흰 채움 + 테두리. 트릴/기즈모는 작게 그리고, 안 쓰면 옅은 테두리로 뒤로 물러나게.
- **컴포넌트 인터페이스:** `<FluteDiagram pressed={KeyId[]} onKeyTap?={(k)=>...} scale?={number} showLabels?={boolean} />` 형태로, `pressed` 배열만 받아 순수하게 그린다(데이터와 분리).

---

# PART B — 단계별 빌드 프롬프트

> 각 Phase를 **순서대로 하나씩** 붙여넣으세요. 각 단계 끝의 **완료 기준** 체크리스트를 통과하면 다음 단계로.

## Phase 0 — 프로젝트 스캐폴딩

```
PART A를 기준 문서로 삼아, 다음을 수행해 줘.
- Vite + React + TypeScript 프로젝트를 생성하고 Tailwind CSS, Framer Motion, Zustand,
  lucide-react를 설치한다. (오디오 smplr, 오선보 VexFlow는 설치만 해 두고 import는 나중 단계에서.)
- A-6의 CSS 변수를 전역 스타일에 넣고, Tailwind에서 var(--ink) 등을 색으로 쓸 수 있게 설정한다.
- Pretendard 웹폰트를 적용한다.
- 하단 탭 4개(운지 탐색 / 배우기 / 연습 / 퀴즈)의 빈 화면 골격과 라우팅(또는 탭 상태)을 만든다.
- 모바일(폭 390px) 기준의 빈 셸이 깔끔히 보이게 한다. 아직 기능은 없어도 된다.

완료 기준:
□ npm run dev 로 에러 없이 뜬다  □ 하단 탭 4개가 보이고 전환된다
□ 배경/카드/색이 디자인 토큰대로 적용된다  □ 모바일 폭에서 레이아웃이 깨지지 않는다
```

## Phase 1 — 플루트 다이어그램 컴포넌트(앱의 심장)

```
A-10 사양대로 <FluteDiagram /> 컴포넌트를 SVG로 만들어 줘.
- props: pressed: KeyId[], scale?, showLabels?, onKeyTap?.
- KEY_POS 좌표와 렌더 규칙(관/입술판/손 구분 점선/줄기/키 상태)을 정확히 따른다.
- pressed에 포함된 키만 꽉 찬 원, 나머지는 흰 원+테두리. 트릴/기즈모는 작게.
- showLabels=true면 각 키 위치 옆에 작은 라벨(엄지 B♭/B, 왼손 1·2·3, G♯, 오른손 1·2·3, E♭, 풋 C♯·C·B, 트릴, 기즈모)을 단다.
- onKeyTap이 있으면 키를 탭할 수 있고, 탭 시 Framer Motion으로 살짝 눌리는 애니메이션.
- 데모용으로, 화면에 여러 pressed 예시(G4, C7 등)를 나란히 렌더해 눈으로 확인할 수 있게 한다.

완료 기준:
□ G4를 주면 왼손 3키+엄지B+E♭만 채워진다  □ 열린 키와 닫힌 키가 한눈에 구분된다
□ showLabels로 각 키 이름이 보인다  □ scale을 바꿔도 비율이 유지된다
```

## Phase 2 — 운지 탐색기(음 선택 → 운지·계이름·주파수)

```
A-9의 NOTES 데이터를 src/data/notes.ts로 추가하고, '운지 탐색' 탭을 완성해 줘.
- 상단: 음역 토글(저 register1 / 중 2 / 고 3)과 표기 토글(음이름 / 계이름 / 둘 다).
- 음 선택 UI: 선택한 음역의 음들을 가로 스크롤 '건반/칩' 형태로 나열(딴이름한소리는 작게 병기).
- 음을 선택하면 가운데에 <FluteDiagram pressed={선택음.fingerings[0].keys} /> 를 크게 보여 준다.
- 그 아래 정보 카드: 음이름(C·D·E…), 계이름(고정도법, C-1 매핑표), 과학적 음높이, freqOf(midi)로 계산한 주파수(Hz), note 각주.
- 대체 운지가 있으면(예: B♭, C7) '다른 운지 보기' 토글로 fingerings[1]을 함께 보여 주고 label을 표시.
- A-7 정확성 규칙을 위반하지 않는다(데이터의 keys 외에는 칠하지 않는다).

완료 기준:
□ D4 선택 시 E♭ 키가 비어 있다(뗌)  □ B♭4에서 두 가지 운지가 전환된다
□ 표기 토글로 도레미/CDE 표시가 바뀐다  □ 음역 토글로 칩 목록이 바뀐다
```

## Phase 3 — 오디오(실음 재생)

```
smplr의 Soundfont 플루트로 실음 재생을 붙여 줘.
- 사용자의 첫 탭에서 AudioContext를 resume(브라우저 자동재생 정책 대응)하고 flute 샘플을 로드한다.
- 운지 탐색에서 음을 선택하거나 'soundOn' 버튼을 누르면 해당 음을 재생한다(note=음.id, duration≈1.2s).
- 재생 중에는 FluteDiagram 키에 은은한 글로우, 끝나면 사라지게.
- smplr 로드 실패/네트워크 불가 시 Tone.js 신디사이저(삼각파+약한 비브라토+미세 노이즈)로 자동 폴백.
- 음소거 토글과 로딩 인디케이터를 둔다.

완료 기준:
□ 음 선택 시 0.1~0.2초 내 소리가 난다  □ C4가 가온다(약 261.6Hz)로 들린다
□ 폴백 음색이 동작한다  □ 음소거가 즉시 반영된다
```

## Phase 4 — 음이름 ↔ 계이름 ↔ 오선보 연동 + 조(Key) 선택

```
세 표현을 한 화면에서 연결해 줘.
- VexFlow로 높은음자리표 오선보에 현재 선택음 1개를 음표로 렌더(임시표 포함). 음표를 탭하면 재생.
- '조 선택'(다장조 C, 사장조 G, 바장조 F 등 주요 조)을 추가한다. 선택 조에 따라 계이름을 '이동도법'으로
  다시 계산해 표시한다(예: 사장조에서는 G=도). 고정도법/이동도법 토글도 둔다.
  · 계산 규칙: 이동도법 계이름 = (선택음 - 으뜸음)의 음정에 해당하는 도레미. 반음은 올림(♯)/내림(♭) 도레미로.
- '배우기' 탭에 개념 카드 2개를 만든다: ① 음이름 vs 계이름(같은 음이 조에 따라 계이름이 바뀜을 그림으로)
  ② 옥타브와 과학적 음높이(C4=가온다).

완료 기준:
□ 오선보 음표가 선택음과 일치한다  □ 다장조에서 C=도, 사장조에서 G=도로 바뀐다
□ 고정/이동 도법 토글이 동작한다  □ 개념 카드가 그림 위주로 읽힌다
```

## Phase 5 — 가이드 학습(스케일·동요 따라불기)

```
'연습' 탭을 만들어 줘. C-2의 연습곡/스케일 데이터를 사용한다.
- 곡을 고르면 음표 시퀀스가 가로로 나열되고, '재생' 시 현재 음표가 하나씩 하이라이트(--hl)되며
  그에 맞춰 <FluteDiagram>의 운지가 자동으로 바뀌고 소리가 난다(BPM 조절 슬라이더, 4단계 속도).
- '한 음씩(step)' 모드: 다음 버튼을 누를 때마다 한 음 진행(사용자 페이스 학습).
- 각 음표 위/아래에 계이름(또는 음이름)을 함께 표시. 진행 막대와 '처음부터' 버튼.
- 최소 포함 곡: C장조 스케일(상·하행), 작은별, 학교종(데이터는 C-2 참조).

완료 기준:
□ 재생 시 운지·소리·하이라이트가 음표와 동기화된다  □ step 모드로 한 음씩 진행된다
□ BPM 변경이 반영된다  □ 스케일과 동요가 모두 동작한다
```

## Phase 6 — 퀴즈/게임 모드

```
'퀴즈' 탭을 게임형으로 만들어 줘. 3가지 문제 유형을 무작위로 출제한다.
1) 운지→음이름: FluteDiagram(정답 음의 운지)을 보여 주고 4지선다로 음이름/계이름 맞히기.
2) 음→운지: 음 이름(또는 소리 재생)을 주고, 보기로 제시된 4개의 FluteDiagram 중 맞는 운지 고르기.
3) 오선보→이름: VexFlow 음표를 보여 주고 이름 맞히기.
- 정답: 초록 펄스 + 정답 음 재생, 오답: 좌우 흔들림 + 정답 운지 잠깐 표시.
- 점수, 연속 정답(스트릭), 한 세션 10문제, 끝나면 결과 요약(맞힌 음 / 틀린 음 다시보기).
- 난이도: 음역(저→중→고)으로 범위를 넓히는 옵션.

완료 기준:
□ 3가지 유형이 모두 출제된다  □ 정답/오답 피드백이 명확하다(색+형태+소리)
□ 스트릭/점수가 집계된다  □ 결과 요약에서 틀린 문제를 복습할 수 있다
```

## Phase 7 — 진도 저장 · 설정 · 반응형 · 접근성 · 마무리 폴리시

```
마지막으로 완성도를 끌어올려 줘.
- localStorage(Zustand persist)로 저장: 마지막 본 음/음역, 표기·도법 설정, 퀴즈 최고 점수·완료한 레슨.
- 설정 화면: 음량, 표기(음이름/계이름/둘 다), 도법(고정/이동), 모션 줄이기, (가능하면) 라이트 톤 유지.
- 반응형: 작은 폰~태블릿~데스크톱에서 자연스럽게. 데스크톱에서는 다이어그램과 정보 카드를 좌우 2단으로.
- 접근성 점검: 모든 인터랙티브 요소에 aria-label, 키보드 탐색·포커스 링, 색 외 형태 단서,
  prefers-reduced-motion 존중, 명도 대비 확인.
- 빈/로딩/오류 상태 처리, 첫 방문 3스텝 온보딩(① 음 고르기 ② 운지 보기 ③ 소리 듣기).

완료 기준:
□ 새로고침해도 설정·진도가 유지된다  □ 키보드만으로 핵심 흐름이 가능하다
□ 모션 줄이기가 실제로 애니메이션을 끈다  □ 데스크톱/모바일 모두 레이아웃이 정돈된다
```

---

# PART C — 부록

## C-1. 음이름 · 계이름 · 한국어 음이름 매핑표(고정도법 = 다장조 기준)

| 음이름(영) | 계이름(고정도) | 한국 음이름 | 딴이름한소리 |
|---|---|---|---|
| C | 도 | 다 | — |
| C♯ | 올림도(도♯) | 올림다 | D♭ = 내림레 |
| D | 레 | 라 | — |
| E♭ | 내림미(미♭) | 내림마 | D♯ = 올림레 |
| E | 미 | 마 | — |
| F | 파 | 바 | — |
| F♯ | 올림파(파♯) | 올림바 | G♭ = 내림솔 |
| G | 솔 | 사 | — |
| G♯ | 올림솔(솔♯) | 올림사 | A♭ = 내림라 |
| A | 라 | 가 | — |
| B♭ | 내림시(시♭) | 내림나 | A♯ = 올림가 |
| B | 시 | 나 | — |

> 이동도법에서는 위 '도'가 선택한 조의 으뜸음으로 이동합니다. 예) 사장조(G) → G=도, A=레, B=미, C=파, D=솔, E=라, F♯=시.

## C-2. 연습곡 데이터(그대로 사용)

```ts
// step: { id: 음높이, dur: 박자(1=4분음표) }  — 모두 C4~ 음역, 비이조이므로 id 그대로 재생
export const PRACTICE = {
  cMajorScaleUp:   { title:"다장조 스케일(상행)", bpm:80,
    steps:["C4","D4","E4","F4","G4","A4","B4","C5"].map(id=>({id,dur:1})) },
  cMajorScaleDown: { title:"다장조 스케일(하행)", bpm:80,
    steps:["C5","B4","A4","G4","F4","E4","D4","C4"].map(id=>({id,dur:1})) },

  // 작은별(반짝반짝): 도도솔솔 라라솔 / 파파미미 레레도
  twinkle: { title:"작은별", bpm:96, steps:[
    {id:"C4",dur:1},{id:"C4",dur:1},{id:"G4",dur:1},{id:"G4",dur:1},
    {id:"A4",dur:1},{id:"A4",dur:1},{id:"G4",dur:2},
    {id:"F4",dur:1},{id:"F4",dur:1},{id:"E4",dur:1},{id:"E4",dur:1},
    {id:"D4",dur:1},{id:"D4",dur:1},{id:"C4",dur:2} ] },

  // 학교종: 솔솔라라 솔솔미 / 솔솔미미 레
  schoolBell: { title:"학교종", bpm:100, steps:[
    {id:"G4",dur:1},{id:"G4",dur:1},{id:"A4",dur:1},{id:"A4",dur:1},
    {id:"G4",dur:1},{id:"G4",dur:1},{id:"E4",dur:2},
    {id:"G4",dur:1},{id:"G4",dur:1},{id:"E4",dur:1},{id:"E4",dur:1},
    {id:"D4",dur:2} ] },
};
```

## C-3. 확장 아이디어(원하면 별도 Phase로 추가)

- **트릴/대체 운지 사전:** 빠른 트릴 운지표, 음정별 인토네이션 보정 팁.
- **메트로놈/튜너:** 마이크 입력으로 분 음의 음정을 실시간 판별해 피드백(고급).
- **나만의 곡 입력:** 계이름이나 오선보로 직접 곡을 만들어 따라불기.
- **B풋/C풋 모드 전환:** 악기에 맞춰 B3 표시·C7 운지 옵션을 토글.
- **다국어:** 한국어/영어 UI 전환.

## C-4. 프롬프트 사용 팁

- **한 번에 한 Phase.** 단계가 끝나면 "완료 기준 체크리스트를 스스로 점검하고, 통과하면 통과 항목을 알려 줘"라고 덧붙이면 좋습니다.
- **막히면 좁혀서 요청.** "FluteDiagram에서 트릴 키 줄기가 관과 안 닿아. KEY_POS와 A-10 규칙대로 다시 그려 줘"처럼 사양을 근거로 콕 집어 수정 요청.
- **정확성 회귀 방지.** 운지가 의심되면 "이 음의 keys를 A-9 NOTES와 대조해서 다른 부분만 고쳐 줘"라고 합니다. **A-9 데이터가 항상 정답 기준입니다.**
- **출처 일관성.** 운지 기준은 *The Woodwind Fingering Guide* · 폐쇄 G♯ Boehm 플루트. 다른 운지 표기를 섞지 마세요.
```
