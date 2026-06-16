# 플루트 운지법·계이름 학습 웹앱 개발용 바이브코딩 프롬프트

> 목적: 플루트 초보자가 **계이름 → 운지 → 실제 연주**를 한 화면에서 직관적으로 익힐 수 있는 웹앱을 만들기 위한 단계별 바이브코딩 프롬프트입니다.  
> 사용법: 아래 문서를 그대로 Cursor, Claude Code, ChatGPT, v0, Bolt, Lovable 같은 코딩 도구에 붙여넣거나, `0단계 → 1단계 → 2단계...` 순서대로 나누어 실행하세요.

---

## 0. 최종 목표 요약

**웹앱 이름:** 플루트 핑거링 랩 / Flute Fingering Lab

**핵심 가치:**  
초보자가 “도레미를 어떻게 누르고 어떻게 불어야 하는지”를 외우는 대신, **누를 키가 순서대로 켜지고, 계이름·음이름·운지·연주 팁이 동시에 보이는 학습 경험**을 제공한다.

**대상 사용자:**

- 플루트를 처음 배우는 초등학생, 성인 취미생
- 악보 계이름은 알지만 플루트 운지가 헷갈리는 사람
- 선생님 없이 혼자 복습하는 학습자
- 모바일로 빠르게 운지를 검색하려는 사용자

**앱이 반드시 해결해야 하는 문제:**

1. 계이름 “도/레/미...”를 보면 어떤 음인지 모르겠다.
2. 음이름 “C4, D5...”와 계이름 “도4, 레5...”가 연결되지 않는다.
3. 플루트 그림에서 어떤 키를 눌러야 하는지 직관적으로 보이지 않는다.
4. 같은 A#/Bb처럼 이름은 다른데 소리는 같은 음과 대체 운지가 헷갈린다.
5. 저음, 중음, 고음에서 같은 운지처럼 보여도 바람 방향과 소리 내는 방법이 다르다.
6. 내가 연주한 음이 맞는지 바로 피드백을 받고 싶다.

---

## 1. 복사용 마스터 프롬프트

아래 프롬프트를 코딩 AI에게 먼저 붙여넣으세요.

```text
너는 시니어 프론트엔드 엔지니어, 음악교육 UX 디자이너, 플루트 초급 교재 설계자 역할을 동시에 맡는다.

목표는 “플루트 운지법과 계이름 연주 방법을 가장 직관적이고 사용자 친화적으로 배울 수 있는 웹앱”을 구현하는 것이다.

앱 이름은 “Flute Fingering Lab / 플루트 핑거링 랩”으로 한다.

기술 스택:
- Next.js App Router + TypeScript
- Tailwind CSS
- SVG 기반 플루트 운지 다이어그램
- Web Audio API 기반 기준음 재생과 선택 기능
- 선택 사항: 마이크 피치 감지 기능은 로컬 처리만 사용
- 상태 저장은 localStorage로 시작하고, 백엔드는 만들지 않는다
- 데이터는 src/data/fingerings.ts에 정적 TypeScript 객체로 관리한다

학습 UX 원칙:
1. 사용자가 음을 선택하면 한 화면에 “계이름, 국제 음이름, 옥타브, 운지, 눌러야 할 키 목록, 연주 팁, 기준음 재생”이 동시에 보여야 한다.
2. 검은색/채워진 키는 누름, 흰색/빈 키는 뗌으로 표시한다. 색만으로 구분하지 말고 텍스트와 아이콘도 함께 제공한다.
3. “초보자 모드”에서는 누를 키를 순서대로 하이라이트한다. 예: 1) 왼손 엄지 B, 2) 왼손 1·2·3, 3) 오른손 1·2, 4) 오른손 새끼 Eb.
4. B♭/A#처럼 대체 운지가 있는 음은 “추천 운지”, “대체 운지” 카드로 나누어 보여준다.
5. B foot이 필요한 낮은 B3, Gizmo가 필요한 C7 변형은 설정에서 B foot 악기 사용 여부에 따라 표시/비활성화한다.
6. 마이크 기능은 선택 사항이며, 사용자에게 “소리는 기기 밖으로 전송되지 않습니다”라고 명확히 안내한다.
7. 앱은 모바일 우선으로 설계하고, 데스크톱에서는 더 넓은 학습 패널을 제공한다.
8. 플루트 초보자가 매일 3분씩 연습할 수 있도록 “오늘의 5음”, “운지 맞추기”, “소리 맞추기” 연습 모드를 제공한다.

운지 데이터 기준:
- Modern Boehm-system C Flute
- closed G# 시스템 기준
- 범위: B3(B foot 전용)부터 D7까지
- 약어: BbT=엄지 Bb, T=엄지 B, L1-L3=왼손 1-3, R1-R3=오른손 1-3, Eb=오른손 새끼, C#/C/B=풋조인트, Dtr/D#tr=트릴키, Gz=Gizmo
- 검은 원/채움 = 누름/닫힘, 흰 원/빈 원 = 열림/뗌
- A#/Bb는 최소 두 운지: 1-and-1, Bb 엄지
- C7은 최소 두 변형: C foot, B foot + Gizmo
- 낮은 B3와 Gizmo는 B foot 악기에서만 사용 가능

반드시 구현할 화면:
1. 홈: 오늘 배울 음, 빠른 검색, 추천 학습 경로
2. 운지 탐색기: 음 선택 → 운지 다이어그램 + 계이름 + 연주 방법
3. 계이름 지도: 도·레·미·파·솔·라·시와 C·D·E·F·G·A·B 매핑
4. 연습 모드: 운지 보고 음 맞추기, 계이름 보고 운지 맞추기, 기준음 듣고 따라하기
5. 설정: C foot/B foot, 표기 방식, 초보자/고급자 모드, 고대비 모드

구현 방식:
- 먼저 완성도 높은 MVP를 만든다.
- 컴포넌트를 작게 나눈다.
- 플루트 키는 반드시 재사용 가능한 SVG 컴포넌트로 그린다.
- 운지 데이터와 UI 로직을 분리한다.
- 모든 음표 카드에는 aria-label을 넣는다.
- 모바일 360px 폭에서도 핵심 기능이 보이게 한다.
- 테스트 가능한 데이터 구조와 컴포넌트를 만든다.

출력물:
1. 실행 가능한 Next.js 프로젝트
2. README.md
3. src/data/fingerings.ts
4. src/components/FluteDiagram.tsx
5. src/components/NoteSelector.tsx
6. src/components/LessonCard.tsx
7. src/components/PracticeMode.tsx
8. src/lib/music.ts
9. src/lib/pitchDetection.ts는 선택 구현
10. 접근성 및 정확성 검수 체크리스트

처음부터 모든 기능을 한 번에 만들지 말고 아래 순서로 진행한다:
1. 프로젝트 생성과 기본 레이아웃
2. 운지 데이터 모델
3. SVG 플루트 운지 다이어그램
4. 음 선택 UI
5. 상세 학습 패널
6. 연습 모드
7. 마이크 피치 피드백
8. 접근성·반응형·PWA
9. 데이터 검수와 오류 수정
10. 배포 준비
```

---

## 2. 제품 요구사항 문서(PRD)

### 2.1 핵심 사용자 여정

#### 여정 A: “도4 운지를 알고 싶다”

1. 사용자가 홈에서 `도` 또는 `C4`를 검색한다.
2. 검색 결과에 `C4 · 도4 · 저음역` 카드가 보인다.
3. 카드를 누르면 플루트 그림에서 눌러야 할 키가 검게 표시된다.
4. 오른쪽/아래 설명 패널에 다음이 보인다.
   - 계이름: 도4
   - 음이름: C4
   - 옥타브: 저음역
   - 운지 텍스트: `T 123 | 123C`
   - 손가락 설명: 왼손 엄지 B, 왼손 1·2·3, 오른손 1·2·3, 풋 C 키
   - 연주 팁: “저음 도는 입술 구멍을 너무 작게 조이지 말고, 바람을 낮고 넓게 보냅니다.”
5. `기준음 듣기` 버튼으로 C4 기준음을 들을 수 있다.
6. `한 단계씩 보기` 버튼을 누르면 키가 순서대로 강조된다.

#### 여정 B: “시♭/라#이 헷갈린다”

1. 사용자가 `시b`, `Bb`, `라#`, `A#` 중 하나를 검색한다.
2. 앱은 같은 음이라는 것을 알려준다.
3. 카드에는 `A#/Bb · 라#/시♭`가 표시된다.
4. 상세 화면은 두 운지를 보여준다.
   - 추천: Bb 엄지 운지
   - 대체: 1-and-1 운지
5. 상황 설명을 제공한다.
   - “빠른 패시지에서는 Bb 엄지가 편할 수 있습니다.”
   - “인접한 B natural과 연결할 때는 1-and-1을 비교해보세요.”
6. 초보자에게는 하나를 먼저 익히도록 `먼저 이 운지부터` 배지를 붙인다.

#### 여정 C: “내가 제대로 불었는지 확인하고 싶다”

1. 사용자가 연습 모드에서 `마이크로 확인`을 켠다.
2. 브라우저 권한 요청 전에 앱이 설명한다.
   - “마이크 소리는 서버로 전송되지 않고, 기기 안에서만 분석됩니다.”
3. 사용자가 음을 선택하고 소리를 낸다.
4. 앱이 감지 음, 목표 음, 센트 차이를 표시한다.
5. 초보자용 피드백을 준다.
   - `맞아요`: ±20 cents
   - `조금 높아요`: +20 cents 이상
   - `조금 낮아요`: -20 cents 이하
   - `다른 음이에요`: 반음 이상 차이
6. 피치가 불안정할 때는 “긴 음으로 2초 유지해보세요”라고 안내한다.

---

## 3. 정보 구조와 화면 설계

### 3.1 전체 라우트

```text
/
  홈, 빠른 시작, 오늘의 연습
/learn
  계이름·음이름 기본 설명
/fingerings
  운지 탐색기
/fingerings/[noteId]
  음 상세 학습 화면
/practice
  연습 모드 허브
/practice/fingering-quiz
  운지 보고 음 맞추기
/practice/name-quiz
  계이름 보고 운지 맞추기
/practice/listen-repeat
  기준음 듣고 따라하기
/settings
  악기/표기/접근성 설정
/about
  앱 기준, 운지표 출처 설명, 주의사항
```

### 3.2 홈 화면

**상단:**

- 앱 로고: “Flute Fingering Lab”
- 짧은 설명: “계이름을 고르면 운지가 바로 보입니다.”
- 검색창 placeholder: `도4, C4, 시b, Bb, 파#...`

**메인 카드 3개:**

1. `운지 바로 찾기`
2. `도레미 계이름 배우기`
3. `오늘의 5음 연습`

**초보자 추천 경로:**

```text
1일차: 도4–솔4
2일차: 라4–도5
3일차: 반음과 시♭
4일차: 중음역 D5–G5
5일차: 간단한 멜로디
```

### 3.3 운지 탐색기 화면

구성:

- 왼쪽/상단: 음 선택 그리드
- 오른쪽/하단: 선택 음 상세
- 하단 고정: 기준음 재생, 한 단계씩 보기, 연습에 추가

필터:

- 전체
- 저음역
- 중음역
- 고음역
- 최고음역
- 자연음
- 올림표/내림표
- 대체 운지 있음
- B foot 필요

### 3.4 음 상세 화면

필수 요소:

```text
[큰 제목]
C4 / 도4

[보조 정보]
저음역 · Modern Boehm C Flute · C foot 가능

[플루트 SVG 운지]
검은 키 = 누름
흰 키 = 뗌

[운지 한 줄 표기]
T 123 | 123C

[손가락 순서]
1. 왼손 엄지 B 키를 누릅니다.
2. 왼손 1·2·3을 누릅니다.
3. 오른손 1·2·3을 누릅니다.
4. 오른손 새끼로 C 풋 키를 누릅니다.

[연주 방법]
- 바람: 낮고 넓게
- 입술: 너무 조이지 않기
- 혀: “투” 또는 “두”로 부드럽게 시작
- 자주 나는 실수: 바람이 너무 세면 한 옥타브 위로 튈 수 있음

[버튼]
기준음 듣기 · 한 단계씩 보기 · 이 음 연습하기
```

---

## 4. 계이름·음이름 매핑 규칙

앱은 기본적으로 **고정도법(fixed-do)** 을 사용한다.

| 국제 음이름 | 한국어 계이름 | 반음 표기 |
|---|---|---|
| C | 도 | C# = 도# / Db = 레♭ |
| D | 레 | D# = 레# / Eb = 미♭ |
| E | 미 |  |
| F | 파 | F# = 파# / Gb = 솔♭ |
| G | 솔 | G# = 솔# / Ab = 라♭ |
| A | 라 | A# = 라# / Bb = 시♭ |
| B | 시 |  |

### 4.1 앱 내 표기 원칙

- `C4`는 `도4`로 표시한다.
- `C#4/Db4`는 `도#4/레♭4`로 표시한다.
- 한글 텍스트에서는 `시b`보다 `시♭`를 우선 표시하되, 검색은 `시b`, `sib`, `bb`, `Bb`를 모두 허용한다.
- 초보자 모드에서는 `C4`보다 `도4`를 크게 보여준다.
- 고급자 모드에서는 `C4`와 `도4`의 시각적 비중을 같게 한다.

---

## 5. 운지 데이터 모델 설계

### 5.1 TypeScript 타입

```ts
export type FluteKeyId =
  | "thumbBb"
  | "thumbB"
  | "left1"
  | "left2"
  | "left3"
  | "gSharp"
  | "dTrill"
  | "dSharpTrill"
  | "right1"
  | "right2"
  | "right3"
  | "eb"
  | "footCSharp"
  | "footC"
  | "footB"
  | "gizmo";

export type KeyState = "closed" | "open" | "optional" | "notAvailable";

export type OctaveBand = "low" | "middle" | "high" | "top";

export interface FingeringVariant {
  id: string;
  label: string;
  recommended?: boolean;
  requiresBFoot?: boolean;
  requiresGizmo?: boolean;
  token: string;
  keyStates: Partial<Record<FluteKeyId, KeyState>>;
  stepByStep: string[];
  playTips: string[];
  cautions?: string[];
}

export interface NoteInfo {
  id: string;
  chromaticIndex: number;
  midi: number;
  scientificName: string;
  enharmonicName?: string;
  koreanName: string;
  displayName: string;
  octaveBand: OctaveBand;
  aliases: string[];
  variants: FingeringVariant[];
}
```

### 5.2 운지 토큰 표기법

토큰은 사용자에게 보여주는 짧은 운지 표기다.

```text
T 123 | 123Eb
```

의 의미:

- `T`: 왼손 엄지 B 키
- `123`: 왼손 또는 오른손 1·2·3
- `-`: 해당 손가락을 떼어 둠
- `G#`: 왼손 새끼 G# 키
- `Eb`: 오른손 새끼 Eb 키
- `C#`, `C`, `B`: 풋조인트 키
- `Gz`: Gizmo 키
- `D`, `D#`: 트릴키가 필요한 고음 운지에서 사용

중요:  
3옥타브 이상은 교차 운지가 많으므로 토큰 문자열을 억지로 파싱하지 말고, `keyStates` 객체를 직접 기준으로 SVG를 렌더링한다.

---

## 6. 초기 운지 데이터 표

아래 표를 `fingerings.ts` 작성 시 기준 데이터로 사용한다. 실제 앱에서는 각 행을 `NoteInfo` 객체로 변환한다.

| 음 | 계이름 | 음역 | 기본 운지 토큰 | 비고 |
|---|---|---|---|---|
| B3 | 시3 | 저음역 | `T 123 \| 123B` | B foot 전용 |
| C4 | 도4 | 저음역 | `T 123 \| 123C` |  |
| C#4/Db4 | 도#4/레♭4 | 저음역 | `T 123 \| 123C#` |  |
| D4 | 레4 | 저음역 | `T 123 \| 123` |  |
| D#4/Eb4 | 레#4/미♭4 | 저음역 | `T 123 \| 123Eb` |  |
| E4 | 미4 | 저음역 | `T 123 \| 12-Eb` |  |
| F4 | 파4 | 저음역 | `T 123 \| 1--Eb` |  |
| F#4/Gb4 | 파#4/솔♭4 | 저음역 | `T 123 \| --3Eb` |  |
| G4 | 솔4 | 저음역 | `T 123 \| ---Eb` |  |
| G#4/Ab4 | 솔#4/라♭4 | 저음역 | `T 123G# \| ---Eb` |  |
| A4 | 라4 | 중음역 | `T 12- \| ---Eb` |  |
| A#4/Bb4 | 라#4/시♭4 | 중음역 | `T 1-- \| 1--Eb` | 1-and-1 |
| A#4/Bb4 | 라#4/시♭4 | 중음역 | `BbT 1-- \| ---Eb` | Bb 엄지 |
| B4 | 시4 | 중음역 | `T 1-- \| ---Eb` |  |
| C5 | 도5 | 중음역 | `1-- \| ---Eb` |  |
| C#5/Db5 | 도#5/레♭5 | 중음역 | `--- \| ---Eb` |  |
| D5 | 레5 | 중음역 | `T -23 \| 123` |  |
| D#5/Eb5 | 레#5/미♭5 | 중음역 | `T -23 \| 123Eb` |  |
| E5 | 미5 | 중음역 | `T 123 \| 12-Eb` |  |
| F5 | 파5 | 중음역 | `T 123 \| 1--Eb` |  |
| F#5/Gb5 | 파#5/솔♭5 | 중음역 | `T 123 \| --3Eb` |  |
| G5 | 솔5 | 고음역 | `T 123 \| ---Eb` |  |
| G#5/Ab5 | 솔#5/라♭5 | 고음역 | `T 123G# \| ---Eb` |  |
| A5 | 라5 | 고음역 | `T 12- \| ---Eb` |  |
| A#5/Bb5 | 라#5/시♭5 | 고음역 | `T 1-- \| 1--Eb` | 1-and-1 |
| A#5/Bb5 | 라#5/시♭5 | 고음역 | `BbT 1-- \| ---Eb` | Bb 엄지 |
| B5 | 시5 | 고음역 | `T 1-- \| ---Eb` |  |
| C6 | 도6 | 고음역 | `1-- \| ---Eb` |  |
| C#6/Db6 | 도#6/레♭6 | 고음역 | `--- \| ---Eb` |  |
| D6 | 레6 | 고음역 | `T -23 \| ---Eb` |  |
| D#6/Eb6 | 레#6/미♭6 | 고음역 | `T 123G# \| 123Eb` |  |
| E6 | 미6 | 고음역 | `T 12- \| 12-Eb` |  |
| F6 | 파6 | 최고음역 | `T 1-3 \| 1--Eb` |  |
| F#6/Gb6 | 파#6/솔♭6 | 최고음역 | `T 1-3 \| --3Eb` |  |
| G6 | 솔6 | 최고음역 | `123 \| ---Eb` |  |
| G#6/Ab6 | 솔#6/라♭6 | 최고음역 | `-23G# \| ---Eb` |  |
| A6 | 라6 | 최고음역 | `T -2- \| 1--Eb` |  |
| A#6/Bb6 | 라#6/시♭6 | 최고음역 | `T --- \| 1D--` | 트릴키 포함 |
| B6 | 시6 | 최고음역 | `T 1-3 \| --D#-` | 트릴키 포함 |
| C7 | 도7 | 최고음역 | `123G# \| 1--` | C foot |
| C7 | 도7 | 최고음역 | `123G# \| 1--Gz` | B foot + Gizmo |
| C#7/Db7 | 도#7/레♭7 | 최고음역 | `-2-G# \| 1--C#C` |  |
| D7 | 레7 | 최고음역 | `T --3 \| 12-C#C` |  |

---

## 7. 시각 디자인 가이드

### 7.1 디자인 톤

- 밝고 깨끗한 음악 학습 앱
- 초보자가 겁먹지 않도록 둥근 카드와 큰 버튼 사용
- 검은색/흰색 운지 대비를 명확히 유지
- 색상은 기능 보조용으로만 사용하고, 의미 전달은 텍스트와 형태로도 제공

### 7.2 추천 컬러 토큰

```css
:root {
  --bg: #f8fafc;
  --card: #ffffff;
  --ink: #14213d;
  --muted: #64748b;
  --line: #cbd5e1;
  --pressed: #0f172a;
  --open: #ffffff;
  --primary: #2563eb;
  --primary-soft: #dbeafe;
  --accent: #14b8a6;
  --warning: #f59e0b;
  --danger: #ef4444;
  --success: #22c55e;
}
```

### 7.3 컴포넌트 디자인

#### FluteDiagram

- 수평형 플루트 미니맵
- 왼손/오른손/풋조인트 그룹 간 간격을 분명히 둔다.
- 각 키에 `aria-label="왼손 1번 키, 누름"` 형식으로 접근성 라벨을 붙인다.
- `stepHighlightKeyId`가 있으면 해당 키 주위에 파란 링을 표시한다.
- `optional` 상태는 점선 테두리로 표시한다.
- `notAvailable` 상태는 회색 사선 패턴으로 표시한다.

#### NoteCard

표시 내용:

```text
도4
C4
저음역
[미니 운지 그림]
```

상태:

- 선택됨
- B foot 필요
- 대체 운지 있음
- 학습 완료

#### LessonCard

표시 내용:

```text
오늘의 5음
도4 · 레4 · 미4 · 파4 · 솔4
3분 연습
[시작]
```

---

## 8. 컴포넌트 구조

```text
src/
  app/
    layout.tsx
    page.tsx
    learn/page.tsx
    fingerings/page.tsx
    fingerings/[noteId]/page.tsx
    practice/page.tsx
    practice/fingering-quiz/page.tsx
    practice/name-quiz/page.tsx
    practice/listen-repeat/page.tsx
    settings/page.tsx
    about/page.tsx
  components/
    AppShell.tsx
    SearchBox.tsx
    NoteSelector.tsx
    NoteCard.tsx
    FluteDiagram.tsx
    FluteKey.tsx
    FingeringVariantTabs.tsx
    StepByStepGuide.tsx
    SolfegeMap.tsx
    StaffPreview.tsx
    ReferenceToneButton.tsx
    PracticeMode.tsx
    PitchMeter.tsx
    SettingsPanel.tsx
  data/
    fingerings.ts
    lessons.ts
  lib/
    music.ts
    fingering.ts
    pitchDetection.ts
    storage.ts
  styles/
    globals.css
```

---

## 9. 구현 단계별 프롬프트

### 9.1 1단계: 프로젝트 골격 생성

```text
Next.js App Router + TypeScript + Tailwind CSS 프로젝트를 생성해줘.

요구사항:
- 모바일 우선 반응형 레이아웃
- 상단 내비게이션: 홈, 운지 찾기, 계이름 배우기, 연습, 설정
- 기본 폰트는 system-ui + 한국어 가독성 좋은 폰트 스택
- 전역 CSS 변수로 색상 토큰 정의
- AppShell 컴포넌트 만들기
- 홈 화면에 3개 CTA 카드 만들기:
  1. 운지 바로 찾기
  2. 도레미 계이름 배우기
  3. 오늘의 5음 연습
- 아직 실제 운지 기능은 빈 placeholder로 두고 라우트만 연결
- 접근성: 모든 버튼에 명확한 label, 키보드 포커스 스타일 구현
```

### 9.2 2단계: 운지 데이터 모델 구현

```text
src/data/fingerings.ts를 만들어 플루트 운지 데이터를 정적 객체로 구현해줘.

기준:
- Modern Boehm-system C Flute
- closed G# 시스템 기준
- B3(B foot)부터 D7까지
- A#/Bb는 1-and-1과 Bb 엄지 운지를 모두 제공
- C7은 C foot과 B foot + Gizmo 변형을 모두 제공
- B3와 Gizmo 변형은 requiresBFoot/requiresGizmo 플래그를 붙여줘

구현:
- FluteKeyId, KeyState, FingeringVariant, NoteInfo 타입 정의
- fingerings 배열 작성
- noteId는 c4, c-sharp-4, d4 같은 slug로 만든다
- aliases에는 한국어, 영문, 샵/플랫 변형을 넣는다
- src/lib/music.ts에 다음 함수 작성:
  - getFrequencyFromMidi(midi)
  - getKoreanSolfege(noteName)
  - normalizeSearchQuery(query)
  - findNotes(query)
  - centsOff(detectedHz, targetHz)
- 아직 keyStates를 모두 완벽히 채우기 어렵다면 token과 stepByStep부터 정확히 넣고, keyStates는 TODO 표시하지 말고 가능한 범위에서 명시적으로 채워라. 단, 불확실한 고음 운지는 "needsReview: true" 같은 내부 플래그를 추가해 검수 가능하게 하라.
```

### 9.3 3단계: SVG 플루트 운지 다이어그램

```text
FluteDiagram.tsx 컴포넌트를 구현해줘.

요구사항:
- props:
  - keyStates: Partial<Record<FluteKeyId, KeyState>>
  - size?: "sm" | "md" | "lg"
  - stepHighlightKeyId?: FluteKeyId
  - showLabels?: boolean
  - onKeyClick?: (keyId: FluteKeyId) => void
- 플루트는 수평 SVG로 그린다.
- 키 순서:
  1. thumbBb
  2. thumbB
  3. left1
  4. left2
  5. left3
  6. gSharp
  7. dTrill
  8. dSharpTrill
  9. right1
  10. right2
  11. right3
  12. eb
  13. footCSharp
  14. footC
  15. footB
  16. gizmo
- closed는 진한 색 채움, open은 흰색 채움+진한 테두리
- optional은 점선 테두리
- notAvailable은 회색+사선
- 각 키는 <g role="img"> 또는 적절한 aria-label을 가진 SVG 요소로 만든다.
- showLabels=true일 때 키 이름이 작게 보이게 한다.
- 모바일에서는 다이어그램이 가로 스크롤되지 않고 컨테이너 안에서 축소되게 한다.
- 키 클릭 시 하단에 “왼손 2번 키: 누름” 같은 설명이 나오게 연결할 수 있게 한다.
```

### 9.4 4단계: 음 선택·검색 UI

```text
NoteSelector.tsx와 SearchBox.tsx를 구현해줘.

기능:
- 검색어 예시: 도4, c4, C4, 레b, Db, 시b, Bb, 라#, A#
- 검색 결과는 NoteCard 그리드로 보여준다.
- 필터 버튼:
  - 전체
  - 저음역
  - 중음역
  - 고음역
  - 최고음역
  - 자연음
  - 반음
  - B foot 필요
  - 대체 운지 있음
- 검색 결과가 없으면 “도4, C4, 시♭, Bb처럼 입력해보세요.” 안내
- 각 NoteCard에는 미니 FluteDiagram을 넣는다.
- 사용자가 음을 선택하면 URL이 /fingerings/[noteId]로 이동한다.
- C#과 Db처럼 이명동음은 한 카드에 함께 표시한다.
```

### 9.5 5단계: 상세 학습 패널

```text
/fingerings/[noteId] 상세 페이지를 구현해줘.

화면 구성:
- 상단: 큰 계이름, 국제 음이름, 이명동음 표시
- 중앙: 큰 FluteDiagram
- 오른쪽 또는 아래: 운지 설명 패널
- 변형 운지가 여러 개이면 탭 또는 카드로 전환
- 초보자 모드에서 “한 단계씩 보기” 기능 제공
- 각 단계마다 해당 키를 강조하고 설명 문장을 보여준다
- “기준음 듣기” 버튼은 Web Audio API oscillator로 해당 주파수를 1초 재생
- “연습에 추가” 버튼은 localStorage의 practiceQueue에 저장

연주 팁:
- 저음역: 바람을 낮고 넓게, 과하게 세게 불지 않기
- 중음역: 안정적인 중심음 유지
- 고음역: 바람 속도를 올리고 입술 구멍을 약간 작게
- 최고음역: 초보자에게 무리하지 말라는 안내, 선생님 확인 권장

주의:
- 이 앱은 교육 보조 도구이며, 악기 상태와 개인 습관에 따라 세부 운지는 선생님이 조정할 수 있다는 안내를 about 또는 footer에 넣어라.
```

### 9.6 6단계: 계이름 지도 화면

```text
/learn 페이지에 SolfegeMap을 구현해줘.

요구사항:
- C=도, D=레, E=미, F=파, G=솔, A=라, B=시를 큰 카드로 보여준다.
- 샵/플랫 설명:
  - C# = 도# = Db = 레♭
  - D# = 레# = Eb = 미♭
  - F# = 파# = Gb = 솔♭
  - G# = 솔# = Ab = 라♭
  - A# = 라# = Bb = 시♭
- “같은 소리, 다른 이름” 섹션을 만든다.
- 각 계이름 카드를 누르면 해당 음들의 운지 탐색기로 이동한다.
- 초보자 문구:
  - “플루트는 악보의 C가 실제 C로 나는 비이조 악기입니다.”
  - “도4와 도5는 계이름은 같지만 옥타브가 다르고, 바람 방향이 달라집니다.”
- 시각 자료:
  - 도레미 원형 지도
  - 반음 사다리
  - 옥타브별 C4/C5/C6 비교 카드
```

### 9.7 7단계: 연습 모드

```text
/practice 페이지와 3개 연습 모드를 구현해줘.

공통:
- 점수보다 “연속 성공”, “오늘 학습한 음”, “다시 보기”를 강조한다.
- 오답 시 바로 정답을 보여주지 말고 힌트를 1개 제공한다.
- localStorage에 학습 기록 저장:
  - practicedNoteIds
  - correctCount
  - streak
  - lastPracticedAt

모드 1: 운지 보고 음 맞추기
- FluteDiagram만 보여주고 보기 4개 중 음을 선택하게 한다.
- 보기에는 계이름과 국제 음이름을 함께 표시한다.
- 정답 후 “이 운지는 도4예요. T 123 | 123C”처럼 설명한다.

모드 2: 계이름 보고 운지 맞추기
- “도4를 눌러보세요”라고 제시한다.
- 화면의 플루트 키를 사용자가 직접 클릭해서 가상 운지를 만든다.
- 정답 판정은 keyStates와 비교한다.
- 초보자 모드에서는 틀린 키를 빨간색으로만 표시하지 말고 “오른손 2번을 더 눌러보세요”처럼 말한다.

모드 3: 기준음 듣고 따라하기
- 목표 음을 선택한다.
- 기준음을 들려준다.
- 마이크 기능이 꺼져 있으면 “직접 불고 스스로 비교하기” 체크리스트 제공
- 마이크 기능이 켜져 있으면 pitch meter 표시
```

### 9.8 8단계: 마이크 피치 감지

```text
src/lib/pitchDetection.ts와 PitchMeter.tsx를 구현해줘.

요구사항:
- Web Audio API getUserMedia 사용
- 오디오는 서버로 전송하지 않는다.
- 자동 재생 금지. 사용자가 버튼을 눌러야 시작한다.
- 피치 감지는 간단한 autocorrelation 또는 YIN 스타일 알고리즘으로 구현한다.
- 감지된 frequencyHz, nearestNote, cents를 반환한다.
- 목표 음과 비교해 다음 피드백:
  - ±20 cents: 아주 좋아요
  - ±50 cents: 조금 높아요/낮아요
  - 50 cents 이상: 다른 음에 가까워요
  - 신호 약함: 조금 더 길고 안정적으로 불어보세요

UI:
- 원형 또는 수평 피치 미터
- 목표 음 중앙선
- 감지 음 이름
- cents 수치
- “2초 유지 성공” 표시

주의:
- 초보자에게 음정만으로 평가하지 말고, 소리 안정성도 격려한다.
- 마이크 권한 거부 시 앱 전체가 깨지지 않게 한다.
```

### 9.9 9단계: 설정 화면

```text
/settings 페이지를 구현해줘.

설정 항목:
- 악기 풋조인트:
  - C foot
  - B foot
- 표기 우선순위:
  - 계이름 크게
  - 국제 음이름 크게
  - 둘 다 동일
- 초보자 모드:
  - 단계별 운지 설명 켜기/끄기
- 고대비 모드
- 기준음 볼륨
- 마이크 피드백 기본값 끄기/켜기
- 데이터 초기화

동작:
- C foot 선택 시 B3와 B foot+Gizmo 변형은 “B foot 필요”로 비활성화한다.
- B foot 선택 시 B3와 Gizmo 변형을 활성화한다.
- 모든 설정은 localStorage에 저장한다.
```

### 9.10 10단계: 접근성·품질 검수

```text
앱 전체를 접근성, 반응형, 데이터 정확성 관점에서 검수하고 수정해줘.

검수 기준:
- 키보드만으로 모든 기능 사용 가능
- 모든 인터랙티브 요소에 focus ring 표시
- SVG 키에 aria-label 제공
- 색상만으로 정답/오답을 전달하지 않음
- 360px 모바일 폭에서 레이아웃이 깨지지 않음
- prefers-reduced-motion일 때 애니메이션 최소화
- 모든 음의 noteId가 유일함
- A#/Bb는 두 운지가 모두 표시됨
- C7은 C foot과 B foot+Gizmo 변형이 모두 표시됨
- C foot 설정에서 B3는 비활성화됨
- 기준음 재생 버튼은 사용자 클릭 후에만 동작
- 마이크 권한 거부 시 친절한 대체 안내 표시
- localStorage가 비어 있거나 깨져 있어도 앱이 정상 실행
```

### 9.11 11단계: 배포 준비

```text
배포 전 정리 작업을 해줘.

요구사항:
- README.md 작성:
  - 앱 소개
  - 설치 방법
  - 실행 방법
  - 데이터 기준
  - 마이크 기능 개인정보 안내
  - 향후 개선 계획
- package.json scripts 정리:
  - dev
  - build
  - lint
  - test
- 메타데이터:
  - title: 플루트 핑거링 랩
  - description: 계이름으로 배우는 플루트 운지법 학습 웹앱
- Open Graph 이미지 placeholder 또는 기본 메타 설정
- PWA manifest 추가:
  - name
  - short_name
  - theme_color
  - icons placeholder
- Vercel 배포 가능하게 build 오류 제거
```

---

## 10. 핵심 기능별 상세 명세

### 10.1 한 단계씩 운지 보기

상태:

```ts
const [stepIndex, setStepIndex] = useState(0);
const currentStep = selectedVariant.stepByStep[stepIndex];
```

UX:

- `이전`, `다음`, `처음부터` 버튼
- 각 단계에서 해당 키만 파란색 링으로 강조
- 마지막 단계에서 “이제 기준음을 듣고 따라 불어보세요” 표시

예시 단계 문장:

```text
1. 왼손 엄지 B 키를 누릅니다.
2. 왼손 1번, 2번, 3번 키를 누릅니다.
3. 오른손 1번, 2번 키를 누릅니다.
4. 오른손 새끼손가락으로 Eb 키를 누릅니다.
```

### 10.2 기준음 재생

```ts
export function playReferenceTone(frequency: number, durationMs = 900) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + durationMs / 1000 + 0.05);
}
```

주의:

- 실제 플루트 음색을 합성하려고 시간을 낭비하지 말고, MVP는 sine wave 기준음으로 충분하다.
- 나중에 flute sample을 추가할 수 있게 `ReferenceToneButton` 내부 구현을 분리한다.

### 10.3 검색 정규화

검색어 변환 예시:

```text
도 -> C
레 -> D
미 -> E
파 -> F
솔 -> G
라 -> A
시 -> B
샵, #, sharp -> #
b, ♭, flat -> b
도# -> C#
레b -> Db
시b -> Bb
라# -> A#
```

검색 허용:

```text
도4
도
C4
c4
씨포
Bb
B flat
시b
시♭
라#
A#
Gizmo
B foot
```

### 10.4 연주 팁 자동 생성

음역별 기본 팁을 매핑한다.

```ts
const octaveTips = {
  low: [
    "바람을 낮고 넓게 보냅니다.",
    "입술 구멍을 너무 작게 조이지 않습니다.",
    "소리가 한 옥타브 위로 튀면 바람이 너무 빠른지 확인합니다."
  ],
  middle: [
    "저음보다 바람 중심을 조금 더 모읍니다.",
    "손가락보다 소리 시작이 먼저 흔들리지 않게 천천히 연습합니다."
  ],
  high: [
    "바람 속도를 올리되 목과 어깨는 힘을 빼세요.",
    "입술을 과하게 누르지 말고 작은 구멍으로 빠른 바람을 만듭니다."
  ],
  top: [
    "최고음역은 초보자에게 어려울 수 있으니 짧게 시도합니다.",
    "정확한 운지와 바람 방향을 선생님과 확인하는 것이 좋습니다."
  ]
};
```

---

## 11. 데이터 정확성 검수 체크리스트

운지 데이터는 앱 품질의 핵심이다. 구현 후 아래를 모두 확인한다.

### 11.1 구조 검수

- [ ] 모든 `note.id`가 유일하다.
- [ ] 모든 `aliases`가 검색에 반영된다.
- [ ] 모든 `variants`에 `token`이 있다.
- [ ] 모든 `variants`에 `stepByStep`이 있다.
- [ ] B foot 전용 운지에는 `requiresBFoot`가 있다.
- [ ] Gizmo 운지에는 `requiresGizmo`가 있다.
- [ ] 대체 운지가 있는 음에는 `recommended` 플래그가 있다.

### 11.2 음악 내용 검수

- [ ] B3는 B foot 전용으로 표시된다.
- [ ] A#/Bb4는 `1-and-1`과 `Bb 엄지` 두 운지를 제공한다.
- [ ] A#/Bb5도 두 운지를 제공한다.
- [ ] C7은 `C foot`과 `B foot + Gizmo` 변형을 제공한다.
- [ ] `C# / Db`처럼 이명동음이 한 카드에 묶인다.
- [ ] 계이름 표기가 `도# / 레♭`처럼 양쪽 이름을 제공한다.
- [ ] 고음역 운지는 `needsReview` 플래그로 교차 검수할 수 있게 한다.

### 11.3 UX 검수

- [ ] 초보자는 “무엇을 눌러야 하는지” 텍스트로도 이해할 수 있다.
- [ ] 색각 이상 사용자도 열림/닫힘을 구분할 수 있다.
- [ ] 모바일에서 손가락으로 키를 누르기 충분한 터치 영역이다.
- [ ] 마이크 기능 없이도 앱의 핵심 학습이 가능하다.
- [ ] 오답 피드백이 비난형 문장이 아니다.

---

## 12. 추천 개발 순서

### MVP 1일차

- 프로젝트 생성
- 홈/운지 탐색기/상세 라우트
- `fingerings.ts` 초기 데이터
- `FluteDiagram` 기본 렌더링
- 검색과 카드 UI

### MVP 2일차

- 상세 화면 완성
- 단계별 운지 보기
- 기준음 재생
- 계이름 지도
- 설정: C foot/B foot

### MVP 3일차

- 연습 모드 2개
- 학습 기록 localStorage
- 접근성 개선
- 반응형 조정

### V1 확장

- 마이크 피치 피드백
- PWA
- 오늘의 5음 자동 추천
- 학습 통계
- 교사용 공유 링크

---

## 13. README.md 생성 프롬프트

```text
프로젝트 README.md를 한국어로 작성해줘.

포함할 내용:
- 앱 이름: 플루트 핑거링 랩
- 한 줄 소개: 계이름으로 배우는 플루트 운지법 학습 웹앱
- 주요 기능:
  - 운지 검색
  - 계이름 지도
  - SVG 플루트 다이어그램
  - 단계별 운지 안내
  - 기준음 재생
  - 연습 모드
  - 선택적 마이크 피치 피드백
- 설치:
  - pnpm install
  - pnpm dev
- 데이터 기준:
  - Modern Boehm-system C Flute
  - closed G# 시스템
  - B3(B foot)–D7
- 개인정보:
  - 마이크 소리는 로컬에서만 분석
  - 서버 업로드 없음
- 주의:
  - 악기 종류, 풋조인트, 개인 습관에 따라 일부 운지는 선생님 확인 권장
- 향후 계획:
  - 더 많은 대체 운지
  - 멜로디 연습
  - 교사용 모드
```

---

## 14. 최종 통합 프롬프트

아래는 코딩 AI에게 “처음부터 끝까지 구현해줘”라고 맡길 때 쓰는 통합 프롬프트입니다.

```text
이 문서의 요구사항을 바탕으로 “플루트 핑거링 랩” 웹앱을 완성해줘.

핵심 구현 순서:
1. Next.js + TypeScript + Tailwind 프로젝트 구조를 만든다.
2. 운지 데이터 타입과 fingerings.ts를 작성한다.
3. SVG 기반 FluteDiagram을 만든다.
4. 운지 검색과 NoteCard 그리드를 만든다.
5. 상세 학습 화면을 만든다.
6. 계이름 지도 화면을 만든다.
7. 연습 모드를 만든다.
8. 기준음 재생을 구현한다.
9. localStorage 설정과 학습 기록을 연결한다.
10. 접근성, 반응형, 데이터 검수를 수행한다.

MVP에서 반드시 작동해야 하는 것:
- 사용자가 “도4” 또는 “C4”를 검색하면 C4 상세 운지가 보인다.
- 사용자가 “시♭” 또는 “Bb”를 검색하면 A#/Bb 대체 운지가 보인다.
- 플루트 다이어그램은 눌러야 하는 키를 검게 표시한다.
- 기준음 듣기 버튼이 동작한다.
- C foot/B foot 설정에 따라 B3와 Gizmo 운지 표시가 달라진다.
- 모바일에서 보기 좋다.
- 키보드 접근성이 있다.

주의:
- 운지 정확성이 의심되는 데이터는 임의로 확정하지 말고 needsReview 플래그를 추가하고 UI에 “검수 필요”가 아니라 내부 개발용 주석으로만 남겨라.
- 사용자에게는 깔끔하고 자신감 있는 학습 UX를 제공하되, about 페이지에는 “교육 보조 도구”라는 주의문을 넣어라.
- 코드는 실제 실행 가능한 상태여야 한다.
```

---

## 15. 완성 후 사용자 테스트 시나리오

### 테스트 1: 첫 방문자

- 홈 진입
- `도4` 검색
- C4 상세 진입
- 한 단계씩 보기 클릭
- 기준음 듣기
- 연습에 추가

성공 기준:  
사용자가 설명 없이도 어떤 키를 눌러야 하는지 이해한다.

### 테스트 2: Bb 학습자

- `시b` 검색
- A#/Bb 카드 선택
- 대체 운지 탭 확인
- Bb 엄지와 1-and-1 차이 확인

성공 기준:  
사용자가 “같은 음에 여러 운지가 있다”는 사실을 이해한다.

### 테스트 3: B foot 설정

- 설정에서 C foot 선택
- B3 검색
- B3가 비활성 또는 B foot 필요로 표시됨
- B foot 선택
- B3 활성화

성공 기준:  
악기 종류에 따라 가능한 운지가 명확히 구분된다.

### 테스트 4: 모바일

- 360px 폭에서 홈, 검색, 상세, 연습 모드 확인
- SVG 다이어그램이 잘리지 않는지 확인
- 버튼 터치가 쉬운지 확인

성공 기준:  
모바일에서 세로 스크롤만으로 모든 핵심 기능을 사용할 수 있다.

---

## 16. 향후 고급 기능 아이디어

- 악보 오선보 위에 선택 음 표시
- 손가락 이름 퀴즈
- 간단한 멜로디: 비행기, 작은별, 학교종
- 사용자 맞춤 약점 음 추천
- 선생님이 과제를 공유하는 링크
- 운지표 SVG/PDF 내보내기
- Open G# 시스템 옵션
- 더 많은 대체 운지 데이터
- 난이도별 음역 잠금 해제
- MIDI 키보드 또는 컴퓨터 키보드로 음 선택

---

## 17. 한 문장 개발 방향

**“계이름을 누르면 플루트 키가 켜지고, 소리를 들은 뒤, 바로 따라 불며 확인하는 웹앱”** 을 만든다.
