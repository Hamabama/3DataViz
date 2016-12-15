var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass+prefixer', function() {
  return gulp.src('src/Assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/Assets/css/'));
});

gulp.task('watch', function() {
  gulp.watch('src/Assets/scss/**/*.scss', ['sass+prefixer']);
});
