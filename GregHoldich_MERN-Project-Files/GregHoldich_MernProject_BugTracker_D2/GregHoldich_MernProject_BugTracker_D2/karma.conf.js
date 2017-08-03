// Karma configuration
var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*Spec.js',
      'test/**/*Spec.jsx'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*Spec.js': ['webpack'],
      'test/**/*Spec.jsx': ['webpack']
    },
    webpack: webpackConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
