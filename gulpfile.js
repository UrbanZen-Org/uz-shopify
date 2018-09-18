'use strict';

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    notify      = require('gulp-notify'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    gutil       = require('gulp-util'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    destPath    = './assets/';

gulp.task('scripts', function() {
  return browserify('./src/js/script.js',{debug: true})
  .bundle()
  .pipe(source('js-additional-js.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(uglify())
      .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(destPath))
  .pipe(notify({message: "Scripted", onLast: true}));
});

gulp.task('styles', function() {
  return gulp.src('./src/scss/css-additional-styles.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destPath))
    .pipe(notify({message: "Stylin' B", onLast: true}));
});


gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', function() { gulp.run('styles'); });
  gulp.watch('./src/scss/*/*.scss', function() { gulp.run('styles'); });
  gulp.watch('./src/scss/*/*/*.scss', function() { gulp.run('styles'); });
  gulp.watch('./src/js/*.js', function() { gulp.run('scripts') });
  gulp.watch('./src/js/*/*.js', function() { gulp.run('scripts') });
  gulp.watch('./src/js/*/*/*.js', function() { gulp.run('scripts') });
});

gulp.task('default', ['styles','scripts','watch']);