var gulp = require('gulp');
var insalesUp = require('insales-uploader');
var watch = require('gulp-watch');
var conf =  require('./config');

var options = {
    account: {
        id: conf.id,
        token: conf.token,
        url: 'santika-online.myinsales.ru',
        https: true
    },
    theme: {
        id: '684693',
        root: 'my-shop',
        update: true,
        excludeFiles: ['**/*.DS_Store', '**/*.log'],
        startBackup: true
    },
    tools: {
        debugMode: false,
        openBrowser: {
            start: true,
            app: 'firefox'
        },
        browserSync: {
            start: false,
            uploadRestart: false,
            browser: 'firefox'
        },
        stylelint: {
            use: true,
            stopOnFail: true,
            config: {
                "rules": {
                    "property-no-unknown": true
                }
            }
        }
    }
};

var InsalesUploader = new insalesUp(options);

gulp.task('download', function () {
    return InsalesUploader.download()
});

gulp.task('pull', function () {
    return InsalesUploader.pullTheme()
});

gulp.task('push', function () {
    return InsalesUploader.pushTheme()
});

gulp.task('stream', function () {
    return InsalesUploader.stream()
});

gulp.task('watch', function () {
    return watch(InsalesUploader.paths.toWatch, function (_vinyl) {
        InsalesUploader.triggerFile(_vinyl.event, _vinyl.path);
    });
});

gulp.task('backup', function () {
    return InsalesUploader.backup()
});

gulp.task('diff-assets', function () {
    return InsalesUploader.diffLocalAssets()
});

gulp.task('init-assets', function () {
    return InsalesUploader.initAssets()
});

gulp.task('upload', function () {
    return InsalesUploader.upload({
        update: true
    })
});

gulp.task('open-browser', function () {
    return InsalesUploader.openBrowser()
});

gulp.task('default', ['download'], function () {
    return gulp.start('stream');
});

