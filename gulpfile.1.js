const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnext = require('cssnext');
const precss = require('precss');
const cssmin = require('gulp-cssmin');

gulp.task('stylusTask', function() {
  return gulp.src('./css/*.styl')
      .pipe(sourcemaps.init())
      .pipe(stylus({
        linenos: true,
        compress: false
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dev/css'));
});

gulp.task('postcssTask',['stylusTask'],function(){
  var processors = [autoprefixer, cssnext, precss];
      gulp.src('./dev/css/*.css')
        .pipe(postcss(processors))
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
});

gulp.task("default", function() {
  gulp.watch("./css/*.styl", ['postcssTask']);
});