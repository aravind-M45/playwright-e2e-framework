import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  //testDir: 'src/test', //for pages

  //tags
  //grep:/@sanity/,
  //grepInvert:/@regression/,


  // Customize Global Test TimeOut
  timeout: 60000,    //def = 30000(30sec)
  
  // Customize Expect(assert) Time-Out
  expect: {timeout:15000}, //def 5000(5sec) 

  
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  //retries: process.env.CI ? 1 : 0,
  retries:1, //locally

  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['html'],['list'],['allure-playwright']],
  reporter: [ ['html',{open:'never'}],
              ['list'],
              ['allure-playwright'],
              ['junit',{outputFile:'junit-test-report.xml'}],
            ],

  /*reporter:[
            ['html',{open:'always',outputFolder:'my-report'}],
            ['list'],
            ['dot'],
            ['junit',{outputFile:'results.xml'}],
            ['json',{outputFile:'results.json'}]
          ],
  */
  //Third party report -> Allure
  /*reporter:[['list'],['allure-playwright']]
   reporter: [
    ['list'],
    ['allure-playwright', { detail: true }]
  ],*/

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    //ViewPort
    viewport: { width: 720, height: 450 },

    navigationTimeout:20000,
    screenshot: 'only-on-failure',   
    video: 'retain-on-failure',      
    trace: 'retain-on-failure',

    /*Screenshot Config
    screenshot:'only-on-failure',
    //Videos
    video:{
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 }
    },
    //trace
    //Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer 
    trace:'retain-on-failure',*/
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        //viewport: { width: 920, height: 750 }
      },
      
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  // },
});
