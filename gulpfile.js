var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css');

gulp.task('Less', function() {
    gulp.src('style/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('css/'));
});



gulp.task("watchLess", function() {
    gulp.watch("style/*.less", ['Less']);
});