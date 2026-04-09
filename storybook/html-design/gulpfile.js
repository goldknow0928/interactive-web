const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function buildSCSS() {
  return src('src/assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/css'));
}

function watchSCSS() {
  watch('src/assets/**/*.scss', buildSCSS);
}

exports.default = series(buildSCSS, watchSCSS);
