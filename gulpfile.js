var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

// Set the banner content
var banner = ['/*!\n',
  ' * Joshua Schmidt - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/jschmidtnj/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// get html copied
gulp.src([
  './src/html/*.html'
]).pipe(gulp.dest('./public'));

// get particles config copied
gulp.src([
  './src/particles.json'
]).pipe(gulp.dest('./public'));

// get images copied
gulp.task('img', function () {
  gulp.src([
    './src/img/*'
  ]).pipe(gulp.dest('./public/img'));
});

gulp.start('img');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Font Awesome 5
  gulp.src([
      './node_modules/@fortawesome/**/*'
    ])
    .pipe(gulp.dest('./public/vendor'));

  // Simple Line Icons
  gulp.src([
      './node_modules/simple-line-icons/fonts/**',
    ])
    .pipe(gulp.dest('./public/vendor/simple-line-icons/fonts'));

  gulp.src([
      './node_modules/simple-line-icons/css/**',
    ])
    .pipe(gulp.dest('./public/vendor/simple-line-icons/css'));

  var css = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ];
  var js = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery.easing/jquery.easing.min.js',
    './node_modules/particles.js/particles.js'
  ];

  gulp.src(js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/vendor'));

  gulp.src(css)
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/vendor'));
});

// copy vendor code
gulp.start('vendor');

// Compile SCSS
gulp.task('css:compile', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./src/scss/compiled'));
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
  gulp.src([
      './src/scss/compiled/*.css',
      './src/css/*.css',
      '!./src/scss/compiled/*.min.css',
      '!./src/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
  return gulp.src([
      './src/js/*.js',
      '!./src/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function () {
  gulp.watch('./src/scss/*.scss', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/html/*.html', function () {
    gulp.src([
      './src/html/*.html'
    ]).pipe(gulp.dest('./public')).on('end', browserSync.reload);
  });
  gulp.watch('./src/particles.json', function () {
    gulp.src([
      './src/particles.json'
    ]).pipe(gulp.dest('./public')).on('end', browserSync.reload);
  });
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('gulpfile.js', ['vendor']);
});