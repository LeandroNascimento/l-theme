var gulp = require('gulp');
var gutil = require('gulp-util');

var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');

var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sassDir = 'assets/sass';
var targetCSSDir = 'assets/css';

var coffeeDir = 'assets/coffee';
var targetJSDir = 'assets/js';

gulp.task('sass', function() {
    return gulp.src(sassDir + '/**/*.sass')
        .pipe(sass({
            style: 'compressed'
        }).on('error', gutil.log))
        // TODO Check gulp-autoprefixer for updated version (pull request)
        //.pipe(autoprefix('last 10 versions').on('error',  gutil.log))
        .pipe(gulp.dest(targetCSSDir));
});

gulp.task('coffee', function() {
    return gulp.src(coffeeDir + '/**/*.coffee')
        .pipe(sourcemaps.init())
        .pipe(coffee({bare: true}).on('error',  gutil.log))
        .pipe(concat('main.js').on('error',  gutil.log))
        .pipe(uglify().on('error',  gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(targetJSDir));
});

gulp.task('watch', function() {
    gulp.watch(sassDir + '/**/*.sass', ['sass']);
    gulp.watch(coffeeDir + '/**/*.coffee', ['coffee']);
});

gulp.task('default', ['sass', 'coffee', 'watch']);