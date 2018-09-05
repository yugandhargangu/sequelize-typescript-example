var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('build', function () {
    gulp.src('./build', { read: false }).pipe(clean()).end(function() {
        gulp.src('./src/**/*.js').pipe(clean()).pipe(gulp.dest('build/'));
    });
});
