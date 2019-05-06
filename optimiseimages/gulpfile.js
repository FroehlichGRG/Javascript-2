let gulp = require('gulp'),
    delFiles = require('del'),
    tinypng= require('gulp-tinypng');

gulp.task('tinypng', ()=>{
    return gulp.src('app/img/*.jpg')
        .pipe(tinypng('k746jRRPMYRa8Ybm94P1HjkMY5MibGT5'))
        .pipe(gulp.dest('dist/img'));
    });

gulp.task('clean', ()=>{
    return delFiles('dist');
    });

gulp.task('default', gulp.series(
    'clean','tinypng'
));