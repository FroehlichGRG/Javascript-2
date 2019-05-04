let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    babel = require('gulp-babel');

gulp.task('html', ()=>{
    return gulp.src('app/html/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', ()=>{
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', ()=>{
    return delFiles('dist');
});

gulp.task('js:es6', ()=>{
    return gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js:babel', ()=>{
    return gulp.src('app/js/**/*.js')
        .pipe(babel(
            {
                presets: ['@babel/env']
            }))
        .pipe(rename({
            suffix: '.es5'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('server', () => {
    return bs(
        {
            server: {
                baseDir: 'dist'
            }
        }
    )
});

gulp.task('sass:watch', () => {
    return gulp.watch('app/sass/**/*.scss', gulp.series('sass', (done) => {
        bs.reload();
        done()
    }))
});

gulp.task('js:watch', () => {
    return gulp.watch('app/js/**/*.js', gulp.series('js:babel', 'js:es6', (done) => {
        bs.reload();
        done()
    }))
});



gulp.task('html:watch', () => {
    return gulp.watch('app/html/**/*.html', gulp.series('html', (done) => {
        bs.reload();
        done()
    }))
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('sass', 'html', 'js:babel', 'js:es6'),
    gulp.parallel('sass:watch', 'js:watch', 'html:watch', 'server')
));