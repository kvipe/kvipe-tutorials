const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

function js() {
	return gulp.src('src/**/*.js', { base: "./src/" })
	.pipe(babel({
			presets: ['@babel/preset-env']
		}))
	.pipe(uglify())
	.pipe(gulp.dest("./dist"));	
}

function css() {
	return gulp.src('src/**/*.css', { base: "./src/" })
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(cleanCSS({compatibility: 'ie9'}))
	.pipe(gulp.dest("./dist"));	
}

function html() {
	return gulp.src('src/**/*.html', { base: "./src/" })
	.pipe(gulp.dest("./dist"));	
}

gulp.task('js', js);
gulp.task('css', css);
gulp.task('html', html);

gulp.task('default', gulp.series('html', 'css', 'js'));