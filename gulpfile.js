var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass+prefixer', function() {
  return gulp.src('Assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('Assets/css/'));
});

gulp.task('mobile sass+prefixer', function() {
  return gulp.src('Assets/scss/mobile/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('Assets/css/mobile/'));
});

gulp.task('watch', function() {
  gulp.watch('Assets/scss/*.scss', ['sass+prefixer']);
  gulp.watch('Assets/scss/mobile/*.scss', ['mobile sass+prefixer']);
});
