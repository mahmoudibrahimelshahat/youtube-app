
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('minify', function() {
    return gulp.src('src/**/*.js') // Get all JS files in the src directory and subdirectories
      .pipe(concat('app.min.js')) // Concatenate them into a single file called app.min.js
      .pipe(uglify()) // Minify the concatenated file
      .pipe(rename({suffix: '.min'})) // Rename the file to app.min.js
      .pipe(gulp.dest('dist/js')); // Save the minified file to the dist/js directory
  });
  gulp.task('default', gulp.series('minify'));
