#!/usr/bin/env node

/**
 * Railway Deployment Fix Script
 * Kiểm tra và sửa các vấn đề thường gặp khi deploy lên Railway
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Railway Deployment Fix Script');
console.log('================================\n');

// 1. Kiểm tra các file cần thiết
const requiredFiles = [
  'my-backend/server.js',
  'my-backend/src/app.js',
  'my-backend/package.json',
  'Dockerfile.railway',
  'railway.json',
  'my-backend/start-railway.sh'
];

console.log('📋 Kiểm tra các file cần thiết:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.log(`   ⚠️ File thiếu: ${file}`);
  }
});

// 2. Kiểm tra package.json dependencies
console.log('\n📦 Kiểm tra dependencies:');
const packageJsonPath = 'my-backend/package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Kiểm tra các dependency cần thiết
  const requiredDeps = ['express', 'pg', 'dotenv', 'cors', 'module-alias'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Thiếu dependencies:', missingDeps.join(', '));
  } else {
    console.log('✅ Tất cả dependencies cần thiết đều có');
  }
  
  // Kiểm tra scripts
  const requiredScripts = ['start', 'db:setup-railway'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.log('❌ Thiếu scripts:', missingScripts.join(', '));
  } else {
    console.log('✅ Tất cả scripts cần thiết đều có');
  }
}

// 3. Kiểm tra Dockerfile.railway
console.log('\n🐳 Kiểm tra Dockerfile.railway:');
const dockerfilePath = 'Dockerfile.railway';
if (fs.existsSync(dockerfilePath)) {
  const dockerfile = fs.readFileSync(dockerfilePath, 'utf8');
  
  const checks = [
    { pattern: /EXPOSE 3000/, message: 'Port 3000 được expose' },
    { pattern: /CMD.*start-railway\.sh/, message: 'Sử dụng start-railway.sh' },
    { pattern: /HEALTHCHECK/, message: 'Health check được cấu hình' },
    { pattern: /USER nextjs/, message: 'Sử dụng non-root user' }
  ];
  
  checks.forEach(check => {
    const found = check.pattern.test(dockerfile);
    console.log(`${found ? '✅' : '❌'} ${check.message}`);
  });
}

// 4. Kiểm tra railway.json
console.log('\n🚂 Kiểm tra railway.json:');
const railwayJsonPath = 'railway.json';
if (fs.existsSync(railwayJsonPath)) {
  const railwayJson = JSON.parse(fs.readFileSync(railwayJsonPath, 'utf8'));
  
  const checks = [
    { key: 'build.dockerfilePath', expected: 'Dockerfile.railway' },
    { key: 'deploy.healthcheckPath', expected: '/health' },
    { key: 'deploy.healthcheckTimeout', expected: 300 }
  ];
  
  checks.forEach(check => {
    const value = check.key.split('.').reduce((obj, key) => obj?.[key], railwayJson);
    const isCorrect = value === check.expected;
    console.log(`${isCorrect ? '✅' : '❌'} ${check.key}: ${value} ${isCorrect ? '' : `(expected: ${check.expected})`}`);
  });
}

// 5. Tạo file environment variables mẫu
console.log('\n🔧 Tạo file .env.railway.example:');
const envExample = `# Railway Environment Variables
# Copy these to your Railway project settings

# Database Configuration
DB_HOST=yamanote.proxy.rlwy.net
DB_PORT=30023
DB_USER=postgres
DB_PASSWORD=sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM
DB_NAME=railway
DB_SSL=true

# Server Configuration
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# Optional
FRONTEND_URL=*
`;

fs.writeFileSync('.env.railway.example', envExample);
console.log('✅ Đã tạo .env.railway.example');

// 6. Tạo script kiểm tra kết nối database
console.log('\n🔧 Tạo script test-railway-connection.js:');
const testScript = `const { Pool } = require('pg');

// Railway PostgreSQL connection config
const config = {
  host: process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 30023,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
  database: process.env.DB_NAME || 'railway',
  ssl: { rejectUnauthorized: false }
};

async function testConnection() {
  console.log('🔍 Testing Railway PostgreSQL connection...');
  console.log('📋 Config:', { ...config, password: '***' });
  
  const pool = new Pool(config);
  
  try {
    const client = await pool.connect();
    console.log('✅ Connection successful!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', result.rows[0].version);
    
    const tablesResult = await client.query(\`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    \`);
    
    console.log(\`📋 Found \${tablesResult.rows.length} tables:\`);
    tablesResult.rows.forEach(row => {
      console.log(\`   - \${row.table_name}\`);
    });
    
    client.release();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await pool.end();
  }
}

testConnection();
`;

fs.writeFileSync('test-railway-connection.js', testScript);
console.log('✅ Đã tạo test-railway-connection.js');

// 7. Đưa ra khuyến nghị
console.log('\n💡 Khuyến nghị để fix deployment:');
console.log('================================');
console.log('1. 🔧 Kiểm tra Environment Variables trên Railway:');
console.log('   - Đảm bảo tất cả biến trong .env.railway.example đã được set');
console.log('   - Đặc biệt chú ý DB_HOST, DB_USER, DB_PASSWORD');
console.log('');
console.log('2. 📋 Kiểm tra Railway Logs:');
console.log('   - Xem Deploy Logs để tìm lỗi cụ thể');
console.log('   - Chú ý các message "❌" hoặc "Error"');
console.log('');
console.log('3. 🧪 Test kết nối database:');
console.log('   - Chạy: node test-railway-connection.js');
console.log('   - Đảm bảo có thể kết nối được database');
console.log('');
console.log('4. 🚀 Redeploy:');
console.log('   - git add .');
console.log('   - git commit -m "Fix: Railway deployment issues"');
console.log('   - git push origin main');
console.log('');
console.log('5. 🔍 Kiểm tra Health Check:');
console.log('   - Sau khi deploy, truy cập: https://your-app.railway.app/health');
console.log('   - Phải trả về: {"status": "UP", "db": true}');

console.log('\n🎉 Script hoàn thành! Hãy làm theo các bước trên để fix deployment.');