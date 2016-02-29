'use strict';
/*jshint:ignore start*/
var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate'),
    connect = require('gulp-connect');

gulp.task('less', function () {
  return gulp.src('./assets/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'LESS task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['public/*.js', 'public/modules/**/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(ngAnnotate())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});

gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/views/index.server.view.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src(['app/views/**/*', 'public/modules/core/views/*', 'public/modules/rr/views/*', 'public/modules/core/modals/*'])
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));
});

// gulp.task('images', function() {
//   return gulp.src(['public/assets/images/**/*.png', 'public/assets/images/*.png'])
//     .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/assets/img'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

gulp.task('watch', function() {
  gulp.watch('assets/less/*.less', ['less']);
  gulp.watch(['public/*.js', 'public/modules/**/**/*.js'], ['scripts']);
  // gulp.watch('src/images/**/*', ['images']);
  // livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('default', ['clean', 'less', 'scripts', 'views', 'express', 'livereload', 'watch']);
gulp.task('serve', ['connect', 'watch']);
// gulp.task('default', ['clean', 'less', 'scripts', 'express', 'livereload', 'watch'], function() {
  // gulp.start('less', 'scripts', 'images');
  // gulp.start('less', 'scripts');
// });