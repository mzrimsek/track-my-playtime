module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-mocha-reporter'),
      require('karma-nyan-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    angularCli: {
      environment: 'dev'
    },
    reporters: ['mocha', 'nyan'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
    singleRun: false
  });
};
