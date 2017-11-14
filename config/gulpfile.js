var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss'),
    cssmin = require('gulp-minify-css'),
    Browsersync = require('browser-sync').create(),
    clearcss = require('gulp-clean-css');

gulp.task('Less', function() {
    var processors = [autoprefixer, cssnext, precss];
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('src/style/'));
});

gulp.task('cssmini', function() {
    gulp.src('src/style/*.css')
        .pipe(order(['reset.css', 'layout.css', 'basic.css', '*.css'], { base: 'src/style/' }))
        .pipe(concat('basic.min.css'))
        .pipe(clearcss())
        .pipe(gulp.dest('src/css/'))
        .pipe(Browsersync.reload({ stream: true }));
});


gulp.task('serve', function() {
    Browsersync.init({
        open: 'localhost:8085', //用局域网ip打开
        server: {
            baseDir: "./src",
            directory: true
        }
    });
    gulp.watch("less/*.less", ['Less', 'cssmini']);
    gulp.watch('src/*.html').on('change', Browsersync.reload);;
});


gulp.task('default', ['serve']);