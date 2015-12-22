var gulp = require('gulp');
var compass = require('gulp-compass');
var minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	del = require('del');

gulp.task('clean', function() {  
    del('./distTemp');
});

gulp.task('compass', function() {
  	gulp.src('./scss/*.scss')
    	.pipe(
    		compass({
	      		css: './distTemp',
	      		sass: './scss',
	      		image: './scss/images',
	      		generated_images_path:'./distTemp/sprites'
    		})
    	).pipe(
    		minifycss()
    	).pipe(
    		rename({suffix: '.min'})
    	).pipe(
    		gulp.dest('./distTemp')
    	);
});

gulp.task('compass:watch',function(){
	gulp.watch('./scss/*.scss', ['compass']);
});