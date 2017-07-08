var gulp = require('gulp'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss'),
    cssmin = require('gulp-minify-css');

gulp.task('Less', function() {
    var processors = [autoprefixer, cssnext, precss];
    gulp.src('style/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(cssmin())
        .pipe(gulp.dest('css/'));
});



gulp.task("watchLess", function() {
    gulp.watch("style/*.less", ['Less']);
});