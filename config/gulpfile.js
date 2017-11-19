var gulp = require('gulp'),
less = require('gulp-less'),
concat = require('gulp-concat'),
order = require("gulp-order"),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
rev = require('gulp-rev-append'),
cssnext = require('cssnext'),
precss = require('precss'),
cssmin = require('gulp-minify-css'),
Browsersync = require('browser-sync').create(),
htmlmin = require('gulp-htmlmin'),
uglify= require('gulp-uglify'),
rename= require('gulp-rename'),
clearcss = require('gulp-clean-css');

gulp.task("jsMin",function(){
gulp.src("./src/js/basic.js")
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/js"));
});



//处理html
gulp.task('htmlMini', function () {
var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};
gulp.src('src/*.html')
    .pipe(rev())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/'))
    .pipe(Browsersync.stream());
});

//处理less	
gulp.task('Less', function() {
var processors = [autoprefixer, cssnext, precss];
return gulp.src('less/*.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/style/'));
});

gulp.task('minicss',["Less"],function(){
gulp.src('src/style/*.css')
    .pipe(order(['reset.css', 'layout.css', 'basic.css', '*.css'], { base: 'src/style/' }))
    .pipe(concat('basic.min.css'))
    .pipe(clearcss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(Browsersync.stream());
});


gulp.task('serve', function() {
Browsersync.init({
    open: 'localhost:8082', //用局域网ip打开
    server: {
        baseDir: "./dist",
        directory: true
    }
});
gulp.watch("less/*.less", ['Less']);
gulp.watch("src/style/*.css", ['minicss']);
gulp.watch("src/js/*.js",["jsMin"]);
gulp.watch('src/*.html',['htmlMini']);
});


gulp.task('default', ['serve']);