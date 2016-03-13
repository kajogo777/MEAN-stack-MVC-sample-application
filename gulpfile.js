var gulp = require('gulp');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');

var srcJs = ['AppModules/*/views/**/*.js','!AppModules/Home/**/*.js'];
var srcHtml = ['AppModules/*/views/**/*.html','!AppModules/Home/**/*.html'];

gulp.task('collect-angular-js',function(){
         gulp.src(srcJs)
             .pipe(concat('controllers.js'))
             .pipe(gulp.dest('public/js'));

});

gulp.task('collect-angular-partials',function(){
         gulp.src(srcHtml)
             .pipe(flatten())
             .pipe(gulp.dest('public/partials'));

});

gulp.task('start', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['public/js/controllers.js', 'public/partials/'],
    tasks: ['collect-angular-js', 'collect-angular-partials'],
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', function() {

  runSequence(
    'collect-angular-js',
    'collect-angular-partials',
    'start',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('FINISHED SUCCESSFULLY');
      }
    });

});
