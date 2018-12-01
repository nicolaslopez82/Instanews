var gulp = require("gulp"); // Load Gulp!
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    eslint = require("gulp-eslint");
    browserSync = require('browser-sync').create(),    
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    babel = require("gulp-babel");

    var os = require('os');
    var open = require('gulp-open');

gulp.task('scripts', function () {
    return gulp
        .src("./js/*.js") // files that gulp consume.
        .pipe(eslint())        
        .pipe(eslint.format())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js"))
        .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function (filename, options) {
    return sass('src/scss/*.scss', options)
          .pipe(autoprefixer('last 2 versions', '> 5%'))
          .pipe(concat(filename))
          .pipe(gulp.dest(DEST+'/css'))
          .pipe(browserSync.stream());
  };
  
  gulp.task('sass', function() {
      return compileSASS('custom.css', {});
  });
  
  gulp.task('sass-minify', function() {
      return compileSASS('custom.min.css', {style: 'compressed'});
  });

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }, 
        startPath: './index.html'
    });

    gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
    // Watch .html files
    gulp.watch('./index.html', browserSync.reload);    
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', gulp.series('scripts'));
    gulp.watch('index.html', gulp.series('scripts'));    
});
/*
// Default usage:
// Open one file with default application
gulp.task('open', function(){
    gulp.src('./index.html')
    .pipe(open());
  });

  var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

    gulp.task('browser', function(){
        gulp.src('./index.html')
        .pipe(open({app: browser}));
      });

gulp.task('app', function(){
    var options = {
        uri: 'localhost:3000',
        app: 'chrome'
    };
    gulp.src(__filename)
    .pipe(open(options));
});*/

// Default Task
gulp.task('default', gulp.series('scripts', gulp.parallel('browser-sync', 'watch'/*, 'open', 'browser'*/)));
