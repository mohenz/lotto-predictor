# 로또 6/45 당첨 예측 프로그램

최근 10년간의 로또 당첨번호를 분석하여 통계 기반으로 다음 회차 예측 번호를 제공하는 웹 애플리케이션입니다.

## 주요 기능

- 📊 **통계 분석**: 번호별 출현 빈도, 홀/짝 비율, 구간별 분포, 연속번호 패턴 분석
- 🎯 **5가지 예측 전략**: 가중 빈도, 균형 분석, 최다 출현, 복합 전략, AI 추천
- 📈 **데이터 시각화**: Chart.js를 활용한 빈도 차트
- 🎨 **현대적인 UI**: 다크 모드, Glassmorphism, 애니메이션
- 📱 **반응형 디자인**: 모든 화면 크기 지원

## 기술 스택

- React 18
- Vite
- Chart.js
- Vanilla CSS

## 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5174 접속

### 빌드
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/        # React 컴포넌트
│   ├── Header.jsx
│   ├── PredictionDisplay.jsx
│   ├── StatisticsPanel.jsx
│   ├── FrequencyChart.jsx
│   └── HistoryTable.jsx
├── services/         # 데이터 서비스
│   ├── lottoService.js
│   └── mockData.js
├── utils/           # 유틸리티 함수
│   ├── analyzer.js
│   └── predictor.js
├── App.jsx
├── main.jsx
└── index.css
```

## 주요 알고리즘

### 1. 가중 빈도 기반
과거 출현 빈도를 가중치로 적용하여 번호 선택

### 2. 균형 분석 기반
홀/짝 비율과 구간 분포를 고려한 균형잡힌 번호 조합

### 3. 최다 출현 번호
최근 자주 나온 HOT 번호 중심으로 선택

### 4. 복합 전략
다양한 분석 기법을 조합한 하이브리드 접근

### 5. AI 추천
최신 트렌드를 반영한 가중치 기반 예측

## 데이터 소스

> **Note**: 현재 CORS 정책으로 인해 브라우저에서 직접 동행복권 API를 호출할 수 없어 Mock 데이터를 사용합니다.
> 
> 프로덕션 환경에서는 백엔드 서버를 통한 프록시 방식으로 실제 당첨번호를 수집할 수 있습니다.

## 면책 조항

⚠️ 본 프로그램은 통계적 분석을 기반으로 하며, 실제 당첨을 보장하지 않습니다.

로또는 완전한 무작위 추첨이므로 과거 데이터가 미래 결과에 영향을 주지 않습니다.

건전한 여가생활로 즐겨주세요.

## 라이선스

MIT License
