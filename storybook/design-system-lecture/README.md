# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


## 💻 개발 환경 설정 (Windows 기준)

이 프로젝트는 **Node.js v20 이상**에서 작동합니다.  
[**nvm-windows**](https://github.com/coreybutler/nvm-windows)로 Node.js 버전을 쉽게 관리할 수 있습니다.

---

### 📌 1. nvm-windows 설치

1. 아래 링크에서 최신 `nvm-setup.zip` 다운로드 및 설치  
   👉 https://github.com/coreybutler/nvm-windows/releases

2. 설치 후, 명령 프롬프트(CMD) 또는 PowerShell 열기

---

### 🚀 2. Node.js v20 설치 및 사용

```bash
nvm install 20
nvm use 20

nvm use 20은 현재 터미널 세션에만 적용됩니다.
VSCode에서는 터미널 다시 열 때마다 실행해줘야 합니다.


// 스토리북
npm run storybook

// 메인
npm run dev