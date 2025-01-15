const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');

const package = require('./package.json');
const banner = `/**
 * Tweelgo
 * 
 * Author: Fabacks
 * License: Free distribution except for commercial use
 * GitHub Repository: https://github.com/Fabacks/tweelgo
 * Version ${package.version}
 * 
 * This software is provided "as is" without any warranty. The author is
 * not responsible for any damages or liabilities caused by the use of this software.
 * Please do not use this software for commercial purposes without explicit permission from the author.
 * If you use or distribute this software, please credit the author and link back to the GitHub repository.
 */\n\n`;


function styles() {
    return src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(header(banner))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist/css'));
}

function stylesCopy() {
    return src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner))
        .pipe(dest('dist/css'));
}

function styleWatch(cb) {
    series(styles, stylesCopy)(cb);
}

function watchFiles() {
    watch('src/*.scss', styleWatch);
}

exports.styles = styles;
exports.copyStyles = stylesCopy;
exports.watch = watchFiles;
exports.default = parallel(styles, stylesCopy);