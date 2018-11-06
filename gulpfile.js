var gulp = require("gulp"); // Load Gulp!
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    eslint = require("gulp-eslint");
    browserSync = require('browser-sync').create();
    
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename");

gulp.task('scripts', function () {
    return gulp
        .src("./js/*.js") // What files do we want gulp to consume?        
        .pipe(eslint())        
        .pipe(eslint.format())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', gulp.series('scripts'));

});

gulp.task('default', gulp.series('scripts', gulp.parallel('browser-sync', 'watch')));
