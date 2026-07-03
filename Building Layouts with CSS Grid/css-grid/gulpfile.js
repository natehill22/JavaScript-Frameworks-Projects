var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: "./" //Base directory is current folder
        }
    });

    //Watches any html or css files and refreshes browser upon any change
    gulp.watch(["./*html", "./css/*.css"]).on('change', browserSync.reload);
})