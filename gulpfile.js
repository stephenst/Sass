/*jslint node:true */
/*globals pipe */

'use strict';

// Load plugins
var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    jade = require('gulp-jade'),
    scsslint = require('gulp-scss-lint')


// SCSS
gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass({
            sourcemap: true,
            sourcemapPath: '',
            compass: true,
            style: 'compact'
        }))
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('build')).pipe(notify({
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
gulp.task('templates', function () {
    var YOUR_LOCALS = {
        basedir: '/github/sass/build/'
    };
    gulp.src('src/**/*.jade')
        .pipe(jade(({
            locals: YOUR_LOCALS
        })))
        .pipe(gulp.dest('./build/'));
});


/** -----------------------------------------------
 * Copy
 * --------------------------------------------- */
gulp.task('copy', [], function () {
    gulp.src(['./src/**', '!./src/components/**/*.jade', '!./src/components/**/*.scss'])
        .pipe(gulp.dest('./build'))
});


/** -----------------------------------------------
 * Clean
 * --------------------------------------------- */
gulp.task('clean', function (callback) {
    del([
        './build',
        // here we use a globbing pattern to match everything inside the `mobile` folder
        './.sass-cache'
    ], callback);
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('styles');
    });

    // Watch .scss files
    gulp.watch('src/**/*.jade', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('templates');
    });
});


// Default task
gulp.task('default', ['clean', 'copy', 'styles', 'templates', 'watch']);
