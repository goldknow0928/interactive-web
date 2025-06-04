# 📘 HTML 기반 Storybook 프로젝트

이 프로젝트는 React, Vue 등의 프레임워크 없이 **순수 HTML/CSS/JavaScript**만으로 Storybook을 사용해 UI 컴포넌트를 문서화합니다.

## ✅ 개발 환경

-   OS: Windows 10/11

-   Node.js: 16 이상

-   NPM: 7 이상

-   Storybook: 최신 버전

-   빌더: Webpack (기본) 또는 Vite (선택)

## 📁 프로젝트 시작 방법

### 1. 프로젝트 생성 및 이동

```
mkdir my-html-storybook

cd my-html-storybook
```

### 2. Node.js 초기화

```
npm init -y
```

### 3. Storybook 설치 (HTML 환경)

```
npx storybook@latest init --type html
```

선택: 더 빠른 환경을 원한다면 --builder vite 옵션을 사용하세요.

```
npx storybook@latest init --type html --builder vite
```

---

## ▶️ Storybook 실행

```
npm run storybook
```

<br>

실행되면 브라우저에서 자동으로 열립니다:

```
http://localhost:6006/
```

---

## 🧱 예시 컴포넌트 추가

`stories/MyCard.stories.js` 파일을 생성하고 아래 코드 입력:

```
export  default { title: 'Example/MyCard',
}; export  const  Default = () => `
  <div style="padding: 1em; border: 1px solid #ccc; border-radius: 8px;">
    <h2>My Card</h2>
    <p>This is a sample card component.</p>
  </div>
`;
```

---

## 📦 주요 디렉토리 구조

```
my-html-storybook/
├── .storybook/ # 스토리북 설정
├── stories/ # 컴포넌트 스토리들
├── package.json
└── README.md
```

---

## 🔧 스토리북 설정 파일 설명

-   `.storybook/main.js`: 로더, 빌더, 스토리 위치 설정
-   `.storybook/preview.js`: 글로벌 CSS, 데코레이터 설정
-   `stories/*.stories.js`: HTML UI 컴포넌트 스토리

---

## 🛠 Troubleshooting

-   ❌ `'storybook'은 내부 또는 외부 명령이 아닙니다`  
    → `npx storybook dev`를 사용하거나, 의존성 확인 후 재설치 필요
-   ❌ `SyntaxError: Unexpected token`  
    → Babel 설정이나 Node.js 버전 문제. `nvm use 18` 등으로 해결 가능

---

## 📚 공식 문서

-   [Storybook for HTML](https://storybook.js.org/docs/get-started/install)
