var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var bowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

gulp.task('index', function () {
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scss', function () {
    return gulp.src('./app/assets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('annotate', function () {
    return gulp.src('./app/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', function () {
    return gulp.src('./app/**/*.tpl.html')
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['templates', 'scss', 'annotate', 'index']);