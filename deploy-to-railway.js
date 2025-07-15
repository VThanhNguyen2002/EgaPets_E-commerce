#!/usr/bin/env node

/**
 * Automated Railway Deployment Script
 * Script này sẽ tự động commit và push code để trigger deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Railway Deployment Script');
console.log('============================\n');

// 1. Kiểm tra git status
console.log('📋 Checking git status...');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('📝 Found changes to commit:');
    console.log(gitStatus);
  } else {
    console.log('✅ No changes to commit');
  }
} catch (error) {
  console.error('❌ Git status check failed:', error.message);
  process.exit(1);
}

// 2. Add all changes
console.log('\n📦 Adding all changes...');
try {
  execSync('git add .', { stdio: 'inherit' });
  console.log('✅ All changes added');
} catch (error) {
  console.error('❌ Git add failed:', error.message);
  process.exit(1);
}

// 3. Commit changes
const commitMessage = 'Fix: Railway deployment issues - Updated database config and troubleshooting';
console.log(`\n💾 Committing changes: "${commitMessage}"`);
try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  console.log('✅ Changes committed');
} catch (error) {
  if (error.message.includes('nothing to commit')) {
    console.log('ℹ️ Nothing to commit, working tree clean');
  } else {
    console.error('❌ Git commit failed:', error.message);
    process.exit(1);
  }
}

// 4. Push to origin
console.log('\n🚀 Pushing to origin main...');
try {
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ Code pushed successfully');
} catch (error) {
  console.error('❌ Git push failed:', error.message);
  console.error('\n🔧 Possible solutions:');
  console.error('1. Check if you have push permissions');
  console.error('2. Verify remote origin is set correctly');
  console.error('3. Try: git remote -v');
  process.exit(1);
}

// 5. Hiển thị thông tin deployment
console.log('\n🎉 Code pushed successfully!');
console.log('\n📋 Next steps:');
console.log('1. 🔍 Check Railway dashboard for automatic deployment');
console.log('2. 📊 Monitor deploy logs for any errors');
console.log('3. 🧪 Test health check: https://your-app.railway.app/health');
console.log('4. 📱 Test your application endpoints');

console.log('\n🔗 Useful links:');
console.log('- Railway Dashboard: https://railway.app/dashboard');
console.log('- Deploy Logs: Check your project > backend service > Deployments');
console.log('- Troubleshooting: See RAILWAY_DEPLOYMENT_TROUBLESHOOTING.md');

console.log('\n⏰ Deployment usually takes 2-5 minutes...');
console.log('🎯 Watch for "Deployment successful" message in Railway dashboard');