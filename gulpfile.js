const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const path = require('path');

const SRC_DIR = 'src';
const DEST_DIR = 'static';

gulp.task('serve', ['html', 'scss'], () => {
  browserSync.init({
    server: {
      baseDir: ['static', 'static/html'],
      routes: {
        '/css': '../css',
        '/images': '../images'
      }
    }
  });

  gulp.watch(`${SRC_DIR}/sass/**/*.scss`, ['scss']);
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

gulp.task('default', ['serve']);
