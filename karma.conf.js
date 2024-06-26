// Karma configuration
// Generated on Sun Sep 09 2018 15:28:39 GMT+0800 (China Standard Time)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "dist",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai", "browserify"],

    // list of files / patterns to load in the browser
    files: ["src/**/*.js", "test/**/*.test.js"],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/**/*.js": ["browserify"],
      "test/**/*.test.js": ["browserify"],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha"],
    plugins: [
      "karma-mocha",
      "karma-browserify",
      "karma-chai",
      "karma-mocha-reporter",
      "karma-firefox-launcher",
    ],
    coverageReporter: {
      reporters: [{ type: "text" }],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Firefox"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
