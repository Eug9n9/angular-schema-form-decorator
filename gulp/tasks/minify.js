var gulp = require('gulp'),
  streamqueue = require('streamqueue'),
  minifyHtml = require('gulp-minify-html'),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

gulp.task('minify', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
    gulp.src('./src/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({
      module: 'schemaForm',
      root: 'decorators/custom/'
    }))
    );
  stream.queue(gulp.src('./src/**/*.js'));

  stream.done()
  .pipe(concat('custom-decorator.js'))
  .pipe(gulp.dest('./dist'))
  .pipe(uglify())
  .pipe(rename('custom-decorator.min.js'))
  .pipe(gulp.dest('./dist'));

});
