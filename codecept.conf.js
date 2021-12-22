const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: 'tests/spec/*.feature.js',
  output: './output',
  helpers: {
    Appium: {
      app: `${process.cwd()}/tests/resources/apk/CTAppium_1_2.apk`,
      platform: 'Android',
      device: 'emulator'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'mob-e2e-appium-codeceptjs',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      outputDir: 'output',
      enabled: true
    }
  }
}