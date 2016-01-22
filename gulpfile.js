var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	del = require('del');

gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts');
});

gulp.task('clean', function() {  
    del('./dist/*');
});

gulp.task('scripts', function() {  
    gulp.src('src/*.js')
        .pipe(
            gulp.dest('./dist')
        )
        .pipe(
            rename({suffix: '.min'})
        )
        .pipe(
            uglify()
        ).pipe(
            gulp.dest('./dist')
        );
});

gulp.task('styles', function() {
  	gulp.src('./src/*.scss')
    	.pipe(
    		compass({
	      		css: './dist',
	      		sass: './src',
	      		image: './src/images',
	      		generated_images_path:'./dist/sprites'
    		})
    	).pipe(
    		minifycss()
    	).pipe(
    		rename({suffix: '.min'})
    	).pipe(
    		gulp.dest('./dist')
    	);
});

gulp.task('compass:watch',function(){
    gulp.watch('./src/*.scss', ['compass']);
});

gulp.task('watch',function(){
    gulp.watch('./src/*', ['scripts','styles']);
});

gulp.task('compass:watch',function(){
	gulp.watch('./src/*.scss', ['styles']);
});

gulp.task('scripts:watch',function(){
    gulp.watch('./src/*.js', ['scripts']);
});
