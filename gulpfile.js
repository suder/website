"use strict";

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

gulp.task('default', function() {
	//console.log('собираю...');
});

/* 
 * собираем stylus 
 * */
 
gulp.task('stylus', function () {
  return gulp.src('./dev/style/*.styl')	
  	.pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'));
});

/* 
 * оптимизация изображений 
 * */

gulp.task('images', () => {
    return gulp.src('./dev/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./app/img'));
});

/* 
 * минификация .css
 * */

/*gulp.task('mincss', function () {
	gulp.src('./app/css/style.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./app/css'));
}); */

/* 
 * watc'еры
 * */

gulp.task('watch', function() {
	gulp.watch('./dev/style/*.styl', ['stylus']);
});

/* 
 * погнали
 * */

gulp.task('default', ['watch', 'stylus', 'images']);