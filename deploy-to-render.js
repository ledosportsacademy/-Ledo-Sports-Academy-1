/**
 * Render Deployment Helper Script
 * 
 * This script helps verify that your application is ready for deployment to Render.
 * It checks for required files and configurations.
 */

const fs = require('fs');
const path = require('path');

console.log('Checking deployment readiness for Render...');

// Check for required files
const requiredFiles = [
  'package.json',
  'server.js',
  'render.yaml',
  'Procfile'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allFilesExist = false;
  }
});

// Check for MongoDB URI in .env (but don't display it)
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  if (envContent.includes('MONGODB_URI=')) {
    console.log('✅ MONGODB_URI is set in .env file');
  } else {
    console.log('❌ MONGODB_URI is not set in .env file');
    allFilesExist = false;
  }
} else {
  console.log('⚠️ .env file not found - you will need to set environment variables on Render');
}

// Check package.json for start script
if (fs.existsSync(path.join(__dirname, 'package.json'))) {
  const packageJson = require('./package.json');
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log(`✅ start script exists: "${packageJson.scripts.start}"`);
  } else {
    console.log('❌ start script is missing in package.json');
    allFilesExist = false;
  }
}

console.log('\nDeployment readiness summary:');
if (allFilesExist) {
  console.log('✅ Your application appears ready for deployment to Render!');
  console.log('\nNext steps:');
  console.log('1. Push your code to a GitHub repository');
  console.log('2. Create a new Web Service on Render');
  console.log('3. Connect your GitHub repository');
  console.log('4. Configure the environment variables');
  console.log('5. Deploy!');
} else {
  console.log('❌ Please address the issues above before deploying to Render.');
}