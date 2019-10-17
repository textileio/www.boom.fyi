var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: "scss/**/*.scss",
        dest: "public/css"
    }
};

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function html() {
  return gulp
    .src('*.html')
    .pipe(gulp.dest("public/"))
}
function images() {
  return gulp
    .src('img/**/**.*')
    .pipe(gulp.dest("public/img/"))
}
function fav() {
  return gulp
    .src('favicon.ico')
    .pipe(gulp.dest("public/"))
}

// A simple task to reload the page
function reload() {
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("*.html", html);
    gulp.watch("public/*.html").on('change', browserSync.reload);
}
 
var build = gulp.parallel(style, fav, images, html, watch);
gulp.task('default', build);
exports.watch = watch
exports.style = style;
exports.html = html;
exports.build = build;
