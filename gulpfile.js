var gulp = require('gulp'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync');

var reload  = browserSync.reload;

gulp.task('php', function() {
    php.server({ 
    	base: 'app',
    	port: 9010, 
    	keepalive: true
    });
});
gulp.task('browser-sync-php',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:9010',
        port: 9000,
        open: true,
        notify: false
    });
});


gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('browser-sync', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css',
        'app/php/**/*.php'
        ]).on('change', browserSync.reload);
});




gulp.task('default', ['server', 'browser-sync']);

gulp.task('server-php', ['browser-sync-php'], function () {
    gulp.watch(['build/*.php'], [reload]);
});

