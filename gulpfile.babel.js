import { src, dest, watch, parallel, series } from 'gulp'
import del from 'del'
import fs from 'fs'
import yaml from 'js-yaml'
import browser from 'browser-sync'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
const $ = require('gulp-load-plugins')()

const content = yaml.safeLoad(fs.readFileSync('./content.yml'))
const { links } = content

const SRC = './src'
const DIST = './dist'

//
// Delete build artifacts
//
export const clean = () => del(DIST + '/**/*')

//
// Styles
//
export const css = () =>
    src(SRC + '/styles/styles.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss([autoprefixer(), cssnano()]))
        .pipe(dest(DIST + '/assets/css/'))

//
// Data injection with Liquid
//
export const template = () => {
    let locals = { links, content }

    return src(SRC + '/index.html')
        .pipe($.liquify(locals))
        .pipe(
            $.htmlmin({
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                useShortDoctype: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                minifyJS: true,
                minifyCSS: true
            })
        )
        .pipe(dest(DIST))
}

//
// Copy Fonts
//
export const fonts = () =>
    src(SRC + '/fonts/**/*').pipe(dest(DIST + '/assets/fonts/'))

//
// Copy Logo
//
export const logos = () =>
    src([
        'node_modules/@oceanprotocol/art/logo/**/*',
        'node_modules/@oceanprotocol/art/mantaray/**/*'
    ]).pipe(dest(DIST + '/assets/img/'))

//
// Copy Favicon
//
export const favicon = () => src(SRC + '/favicon.ico').pipe(dest(DIST))

//
// Revision static assets
//
export const rev = () =>
    src(DIST + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff,woff2}')
        .pipe($.rev())
        .pipe(dest(DIST + '/assets/'))
        // output rev manifest for next replace task
        .pipe($.rev.manifest())
        .pipe(dest(DIST + '/assets/'))

//
// Replace all links to assets in files
// from a manifest file
//
export const revReplace = () => {
    let manifest = src(DIST + '/assets/rev-manifest.json')

    return src(DIST + '/**/*.{html,css,js}')
        .pipe($.revReplace({ manifest: manifest }))
        .pipe(dest(DIST))
}

//
// Watch for file changes
//
export const watchSrc = () =>
    watch([SRC, 'content.yml']).on('all', series(build, browser.reload))

//
// Dev Server
//
export const server = done => {
    browser.init({
        server: DIST,
        port: 1337
    })
    done()
}

//
// Full build
//
export const build = series(
    clean,
    parallel(template, css, fonts, favicon, logos),
    rev,
    revReplace
)

export const dev = series(build, server, watchSrc)

export default dev
