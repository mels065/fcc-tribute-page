const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const pump = require('pump');
const browserSync = require('browser-sync').create();
const path = require('path');

const SRC_DIR = 'src';
const DEST_DIR = 'static';

gulp.task('serve', ['scss', 'js', 'html'], () => {
  browserSync.init({
    server: {
      baseDir: ['static', 'static/html'],
      routes: {
        '/css': './css',
        '/images': './images',
        '/js': './js'
      }
    }
  });

  gulp.watch(`${SRC_DIR}/sass/**/*.scss`, ['scss']);
  gulp.watch(`${SRC_DIR}/js/**/*.js`, ['js']);
  gulp.watch(`${SRC_DIR}/html/**/*.html`, ['html']);
})

gulp.task('html', () => (
    gulp.src(`${SRC_DIR}/html/*.html`)
      .pipe(gulp.dest(`${DEST_DIR}/html`))
      .pipe(browserSync.stream())
));

gulp.task('scss', () => (
  gulp.src(`${SRC_DIR}/sass/*.scss`)
    .pipe(plugins.sassBulkImport())
    .pipe(plugins.sass({ includePaths: ['sass'] }))
    .pipe(plugins.csso())
    .pipe(gulp.dest(`${DEST_DIR}/css`))
    .pipe(browserSync.stream())
));

gulp.task('js', () => (
  pump([
    gulp.src(`${SRC_DIR}/js/*.js`),
    plugins.babel({
      presets: ['@babel/env']
    }),
    plugins.uglify(),
    gulp.dest(`${DEST_DIR}/js`)
  ])
));

gulp.task('default', ['serve']);
