// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    jade = require('gulp-jade'),
    scsslint = require('gulp-scss-lint');


// SCSS
gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass({
            sourcemap: true,
            sourcemapPath: '../scss'
        }))
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('./build'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// SCSS Lint
gulp.task('scsslint', function () {
    gulp.src('src/**/*.scss')
        .pipe(scsslint({
            'config': 'config/scsslint.yml',
        }));
});


// Jade
gulp.task('templates', function() {
    var YOUR_LOCALS = {};
    gulp.src('src/**/*.jade')
        .pipe(jade(({
            locals: YOUR_LOCALS
        })))
        .pipe(gulp.dest('./build/'));
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('scsslint', 'styles');
    });

    // Watch .scss files
    gulp.watch('src/**/*.jade', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('templates');
    });
});


// Default task
gulp.task('default', ['styles', 'scsslint', 'templates', 'watch']);
