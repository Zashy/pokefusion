'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');

var config = {
    compressFiles: true,
    showSourceMaps: false
};

var b = watchify(browserify({
    entries: ['app/scripts/main.js'],
    debug: config.showSourceMaps
}));

gulp.task('scripts:watchify', bundle);
b.on('update', bundle);
b.on('log', plugins.util.log);

function bundle() {
    return b.bundle()
        .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
}

gulp.task('default', ['dev']);

gulp.task('build', ['html', 'styles', 'scripts:watchify', 'images', 'fonts', 'resources']);

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('resources', function(){
	return gulp.src('app/resources/**/*')
		.pipe(plugins.flatten())
		.pipe(plugins.size({ showFiles: true, title: 'resources' }))
		.pipe(gulp.dest('dist/resources'));
});

gulp.task('styles', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(plugins.if(config.showSourceMaps, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.sass({ includePaths: ['node_modules'] }).on('error', plugins.sass.logError))
        .pipe(plugins.size({ showFiles: true, title: 'styles (uncompressed)' }))
        .pipe(plugins.postcss([
            require('autoprefixer-core')({ browsers: ['last 2 versions']}),
            require('postcss-import')()
        ]))
        .pipe(plugins.if(config.compressFiles, plugins.minifyCss({ restructuring: false })))
        .pipe(plugins.if(config.showSourceMaps, plugins.sourcemaps.write('.')))
        .pipe(plugins.size({ showFiles: true, title: 'styles (compressed)' }))
        .pipe(plugins.size({ gzip: true, showFiles: true, title: 'styles (compressed)' }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('styles-simple', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts:browserify', ['jshint'], function() {
    return browserify('app/scripts/main.js', {
        debug: config.showSourceMaps,
        noParse: [
            require.resolve('jquery')
        ]
    })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.size({ showFiles: true, title: 'scripts (uncompressed)'}))
        .pipe(plugins.if(config.showSourceMaps, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.if(config.compressFiles, plugins.uglify()))
        .pipe(plugins.if(config.showSourceMaps, plugins.sourcemaps.write('./')))
        .pipe(plugins.size({ showFiles: true, title: 'scripts (compressed)'}))
        .pipe(plugins.size({ gzip: true, showFiles: true, title: 'scripts (compressed)' }))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts:browserify-simple', ['jshint'], function() {
    return browserify('app/scripts/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts:concat', ['jshint'], function() {
    return gulp.src([
        'app/scripts/main.js'
    ])
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('jshint', function() {
    return gulp.src([
        'gulpfile.js',
        'package.json',
        'app/scripts/**/*.js'
    ])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(plugins.flatten())
        .pipe(plugins.size({ showFiles: true, title: 'fonts' }))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('dev', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            directory: false
        },
        ghostMode: false,
        notify: false
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    //gulp.watch('app/scripts/**/*.js', ['scripts:browserify']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('clean', function(done) {
    var del = require('del');
    del([
        'dist'
    ], done);
});
