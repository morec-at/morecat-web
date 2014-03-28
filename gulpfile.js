var gulp = require('gulp')
  , util = require('gulp-util')
  , cond  = require('gulp-if')
  , uglify = require('gulp-uglify')
  , flatten = require('gulp-flatten')
  , bower = require('gulp-bower-files')
  , clean = require('gulp-clean')
  ;

isRelease = util.env.release;

gulp.task('bower', function() {
  bower()
    .pipe(cond(isRelease, uglify({preserveComments:'some'})))
    .pipe(flatten())
    .pipe(gulp.dest('_public/assets/js/lib'))
});

gulp.task('modules', function() {
  gulp.src('app/modules/*.js')
    .pipe(cond(isRelease, uglify({preserveComments:'some'})))
    .pipe(gulp.dest('_public/assets/js'));
});

gulp.task('assets', function() {
  gulp.src('app/assets/images/**')
    .pipe(gulp.dest('_public/images'));
  gulp.src('app/index.html')
    .pipe(gulp.dest('_public'))
  gulp.src('app/assets/**/*.html')
    .pipe(gulp.dest('_public'));
});

gulp.task('clean', function() {
  gulp.src('_public')
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('app/**', ['modules', 'assets']);
});

gulp.task('default', function() {
  gulp.run('bower', 'modules', 'assets', 'watch');
});