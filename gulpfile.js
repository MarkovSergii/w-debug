const gulp = require('gulp');
const concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('css', function() {
    gulp.src([
        'src/public/css/bootstrap.min.css',
        'src/public/css/sticky-footer-navbar.css',
        'src/public/css/clusterize.css',
        'src/public/css/dragula.min.css',
        'src/public/css/touchsplitter.css',
        'src/public/css/yellow.css',
        'src/public/css/json-formatter.min.css'
        ])
        .pipe(concat("main.css"))
        .pipe(gulp.dest('./dist/public/'))
});

gulp.task('js', function() {
    gulp.src([
        'src/public/js/jquery.min.js',
        'src/public/js/angular.min.js',
        'src/public/js/angular-dragula.min.js',        
        'src/public/js/json-formatter.min.js',        
        'src/public/js/bootstrap.min.js',
        'src/public/js/clusterize.min.js',
        'src/public/js/jquery.touchsplitter.js',
        'src/public/js/ramda.min.js',
        'src/public/js/randomColor.js',
        'src/public/js/socket.io-client.min.js',
        'src/public/js/splitter.js',
        'src/public/js/app.js'
    ])
        .pipe(concat("main.js"))
        .pipe(gulp.dest('./dist/public/'))
});

gulp.task('app', function() {
    gulp.src('src/w-debug.js')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('html', function() {
    gulp.src('src/public/index.html')
        .pipe(gulp.dest('./dist/public'))
});

gulp.task('build',function() {
    gulp.run('html');
    gulp.run('css');
    gulp.run('js');
    gulp.run('app');
});

gulp.task('watch', function() {
    gulp.run('build');
    gulp.watch('src/**/*.*', function() {
        gulp.run('build');
    });
    
})