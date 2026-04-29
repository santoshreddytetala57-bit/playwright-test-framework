import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


import dotenv from 'dotenv';
require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout:40000,
  globalTimeout:60000,

  expect:{
    timeout:2000
  },

  
  
  retries: 1,
  
  reporter: ['json',{outputFile:'test-results/jsonReport.json'}],
           ['junit',{outputFile:'test-results/juniReport.xml'}],
           //['allure-playwright'],
           ['html']
},
  
  use: {
  
     globalsQaURL:'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL:process.env.DEV === '1' ? 'http://localhost:4200/'
            :process.env.STAGING =='1' ? 'http://localhost:4202/'
            :'http://localhost:4200/',

  
    trace: 'on-first-retry',
    navigationTimeout:500,
    video:{
    mode:'off',
    size:{width: 1920,height:1000}
    }
  
  },

 
  projects: [
     {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
         baseURL: 'http://localhost:58613/',
       },
    },
    
    {
      name: 'chromium',
      timeout:6000,
  
      fullyParallel: false
    },

    {
      name: 'firefox',
      use:{
    browserName:'firefox',
     video:{
    mode:'on',
    size:{width: 1920,height:1000}
    }
    }
  },
  {
    name:'pageObjectFullScreen',
    testMatch:'usePageObjects.spec.ts',
    use:{
      viewport:{width:1920,height:1000}
    }
  },
  {
    name:'mobile',
    testMatch: 'testMobile.spec.ts',
    use:{
      ...devices['iPhone 13 Pro'],
      viewport:{width:414,height:800}
    }
  }
],
     
    
});
