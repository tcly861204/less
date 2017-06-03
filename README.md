# SASS学习

###gulp-ruby-sass
gulp-ruby-sass是调用sass，所以需要ruby环境，需要生成临时目录和临时文件

```
    var gulp = require('gulp');
    var sass = require('gulp-ruby-sass');

    gulp.task('sass',function(){
        return sass('style/main.scss')
        .on('error',function(err){
            console.log("Error",err.message);
        })
        .pipe(gulp.dest('css/'));
    });

    gulp.task('watch',function(){
        gulp.watch('style/*.scss',['sass']);
    });


    gulp.task('default',['watch']);

```