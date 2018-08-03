var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
    gulp.src(['../src/index.js', '../src/util.js'])
        .pipe(babel())
        .pipe(gulp.dest('../lib'))
});