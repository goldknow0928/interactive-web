📁 1. 디렉토리 구조 제안

```
project-root/
├── src/
│   ├── components/
│   │   └── button/
│   │       ├── button.njk
│   │       ├── _button.scss
│   │       └── button.stories.js
│   ├── styles/
│   │   └── main.scss
├── .eleventy.js
├── gulpfile.js
├── .storybook/
│   ├── main.js
│   └── preview.js
├── dist/              ← Eleventy + Gulp 출력 위치
├── package.json

```

---



🧱 2. 설치 명령어


```
npm init -y

# Eleventy
npm install --save-dev @11ty/eleventy nunjucks

# Gulp + SCSS
npm install --save-dev gulp gulp-sass sass gulp-clean-css gulp-rename

# Storybook
npx storybook init --builder vite --type html
```


---


⚙️ 3. Eleventy 설정 .eleventy.js

```
module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats(['njk', 'html']);
  eleventyConfig.setTemplateEngine('njk');
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      includes: "components",
      output: "dist"
    }
  };
};
```


---


⚙️ 4. Gulp 설정 gulpfile.js


```
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function buildSCSS() {
  return src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/css'));
}

function watchSCSS() {
  watch('src/styles/**/*.scss', buildSCSS);
}

exports.default = series(buildSCSS, watchSCSS);
```

---

📘 5. Storybook 설정 .storybook/main.js

```


/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  }
};
export default config;
```

---

🚀 7. 실행 명령어 정리

| 작업               | 명령어                 |
| ---------------- | ------------------- |
| Eleventy HTML 생성 | `npx eleventy`      |
| SCSS 빌드 + 감시     | `npx gulp`          |
| Storybook 실행     | `npm run storybook` |
