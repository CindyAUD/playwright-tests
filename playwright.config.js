const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }], 
    ['json', { outputFile: 'report.json' }]
  ],
  use: {
    trace: 'on',  // Enables tracing for debugging
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure'
  },
});
