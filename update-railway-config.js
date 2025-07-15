#!/usr/bin/env node

/**
 * Update Railway Database Configuration
 * Script này sẽ cập nhật cấu hình database với thông tin mới nhất
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Railway Database Configuration Update');
console.log('======================================\n');

// 1. Cập nhật file sql.js với cấu hình database mới
const sqlJsPath = 'my-backend/src/shared/db/sql.js';
const newSqlConfig = `require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL connection config for Railway
const dbConfig = {
  host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 31543,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
  database: process.env.DB_NAME || 'railway',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
  // Connection pool settings optimized for Railway
  max: 10, // Reduced from 20 for Railway limits
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Increased timeout
  acquireTimeoutMillis: 60000, // Added acquire timeout
  createTimeoutMillis: 30000, // Added create timeout
};

console.log('🔗 Database Config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  ssl: !!dbConfig.ssl
});

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ PostgreSQL Pool Error:', err.message);
});

pool.on('connect', (client) => {
  console.log('✅ New client connected to PostgreSQL');
});

pool.on('remove', (client) => {
  console.log('🔄 Client removed from pool');
});

// Test connection and create poolPromise for backward compatibility
const poolPromise = (async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Database Connected Successfully");
    console.log(\`📊 Connected to: \${dbConfig.host}:\${dbConfig.port}/\${dbConfig.database}\`);
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('🔍 PostgreSQL Version:', result.rows[0].version.split(' ')[0]);
    
    client.release();
    return pool;
  } catch (err) {
    console.error("❌ PostgreSQL Database Connection Failed:", err.message);
    console.error("🔧 Troubleshooting:");
    console.error("   1. Check if Railway database is running");
    console.error("   2. Verify environment variables");
    console.error("   3. Check network connectivity");
    
    // Don't exit in production, let the app handle gracefully
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw err;
  }
})();

/* helper query function for PostgreSQL */
async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('❌ Query Error:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

function getPool() {
  return pool;
}

// For backward compatibility, create sql object with common methods
const sql = {
  Int: 'INTEGER',
  NVarChar: 'VARCHAR',
  VarBinary: 'BYTEA',
  Decimal: 'DECIMAL',
  DateTime: 'TIMESTAMP',
  Bit: 'BOOLEAN'
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

module.exports = { sql, dbConfig, poolPromise, query, getPool, pool };
`;

fs.writeFileSync(sqlJsPath, newSqlConfig);
console.log('✅ Đã cập nhật my-backend/src/shared/db/sql.js');

// 2. Cập nhật setup-railway-db.js với cấu hình mới
const setupScriptPath = 'my-backend/scripts/setup-railway-db.js';
const newSetupScript = `require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Railway PostgreSQL connection config - Updated
const config = {
  host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 31543,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
  database: process.env.DB_NAME || 'railway',
  ssl: { rejectUnauthorized: false },
  // Connection settings for Railway
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 5 // Limit connections for setup
};

const pool = new Pool(config);

async function setupRailwayDatabase() {
  console.log('🚀 Setting up PostgreSQL Database on Railway...');
  console.log('📋 Config:', { ...config, password: '***' });
  
  let client;
  try {
    console.log('🔄 Attempting to connect...');
    client = await pool.connect();
    console.log('✅ Connected to Railway PostgreSQL');
    
    // Check if tables already exist
    console.log('\n🔍 Checking existing tables...');
    const tablesQuery = \`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    \`;
    
    const existingTables = await client.query(tablesQuery);
    console.log(\`📊 Found \${existingTables.rows.length} existing tables\`);
    
    if (existingTables.rows.length > 0) {
      console.log('📋 Existing tables:', existingTables.rows.map(r => r.table_name).join(', '));
      console.log('\n⚠️ Database already has tables. Skipping setup to avoid conflicts...');
      return;
    }
    
    // Only setup if no tables exist
    console.log('\n🔧 Setting up fresh database...');
    
    // Read and execute the complete database SQL file
    const sqlFilePath = path.join(__dirname, '../../complete-database-with-data.sql');
    
    if (fs.existsSync(sqlFilePath)) {
      console.log('📄 Executing complete-database-with-data.sql...');
      
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      
      // Clean SQL for Railway (remove database creation commands)
      const cleanedSql = sqlContent
        .replace(/DROP DATABASE IF EXISTS.*?;/gi, '')
        .replace(/CREATE DATABASE.*?;/gi, '')
        .replace(/\\\\c.*?;/gi, '')
        .replace(/USE.*?;/gi, '');
      
      // Execute in transaction for safety
      await client.query('BEGIN');
      
      try {
        // Split and execute statements
        const statements = cleanedSql
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt && !stmt.startsWith('--') && stmt.length > 5);
        
        console.log(\`📝 Executing \${statements.length} SQL statements...\`);
        
        for (let i = 0; i < statements.length; i++) {
          const statement = statements[i];
          if (statement.trim()) {
            try {
              await client.query(statement);
              if (i % 10 === 0) {
                console.log(\`   Progress: \${i + 1}/\${statements.length}\`);
              }
            } catch (stmtError) {
              if (!stmtError.message.includes('already exists')) {
                console.warn(\`⚠️ Statement \${i + 1} warning: \${stmtError.message}\`);
              }
            }
          }
        }
        
        await client.query('COMMIT');
        console.log('✅ Database setup completed successfully');
        
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
      
    } else {
      console.log('⚠️ complete-database-with-data.sql not found, creating basic structure...');
      
      // Create basic Users table as fallback
      await client.query(\`
        CREATE TABLE IF NOT EXISTS "Users" (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'customer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      \`);
      
      console.log('✅ Basic table structure created');
    }
    
    // Verify setup
    console.log('\n🔍 Verifying database setup...');
    const finalTablesQuery = await client.query(tablesQuery);
    console.log(\`✅ Database now has \${finalTablesQuery.rows.length} tables\`);
    
    if (finalTablesQuery.rows.length > 0) {
      console.log('📋 Tables:', finalTablesQuery.rows.map(r => r.table_name).join(', '));
    }
    
  } catch (error) {
    console.error('❌ Railway database setup failed:', error.message);
    console.error('🔧 Possible solutions:');
    console.error('   1. Check Railway database status');
    console.error('   2. Verify connection credentials');
    console.error('   3. Check network connectivity');
    console.error('   4. Try restarting Railway database');
    
    // Don't exit in production deployment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Run setup
if (require.main === module) {
  setupRailwayDatabase();
}

module.exports = { setupRailwayDatabase };
`;

fs.writeFileSync(setupScriptPath, newSetupScript);
console.log('✅ Đã cập nhật my-backend/scripts/setup-railway-db.js');

// 3. Cập nhật .env.railway.example với thông tin mới
const newEnvExample = `# Railway Environment Variables - Updated
# Copy these to your Railway project settings

# Database Configuration (Updated)
DB_HOST=junction.proxy.rlwy.net
DB_PORT=31543
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

# Railway Specific
RAILWAY_ENVIRONMENT=production
`;

fs.writeFileSync('.env.railway.example', newEnvExample);
console.log('✅ Đã cập nhật .env.railway.example');

// 4. Cập nhật test connection script
const newTestScript = `const { Pool } = require('pg');

// Updated Railway PostgreSQL connection config
const config = {
  host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 31543,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
  database: process.env.DB_NAME || 'railway',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
};

async function testConnection() {
  console.log('🔍 Testing Railway PostgreSQL connection (Updated)...');
  console.log('📋 Config:', { ...config, password: '***' });
  
  const pool = new Pool(config);
  
  try {
    console.log('🔄 Attempting connection...');
    const client = await pool.connect();
    console.log('✅ Connection successful!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', result.rows[0].version.split(' ')[0]);
    
    const tablesResult = await client.query(\`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    \`);
    
    console.log(\`📋 Found \${tablesResult.rows.length} tables:\`);
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log(\`   - \${row.table_name}\`);
      });
    } else {
      console.log('   (No tables found - database may need setup)');
    }
    
    client.release();
    console.log('\n🎉 Database connection test passed!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('1. Check if Railway database service is running');
    console.error('2. Verify the connection credentials are correct');
    console.error('3. Check if the database host/port has changed');
    console.error('4. Try restarting the Railway database service');
    console.error('5. Check Railway dashboard for any service issues');
  } finally {
    await pool.end();
  }
}

testConnection();
`;

fs.writeFileSync('test-railway-connection.js', newTestScript);
console.log('✅ Đã cập nhật test-railway-connection.js');

console.log('\n🎉 Cập nhật cấu hình hoàn thành!');
console.log('\n📋 Các thay đổi đã thực hiện:');
console.log('1. ✅ Cập nhật database host: junction.proxy.rlwy.net');
console.log('2. ✅ Cập nhật database port: 31543');
console.log('3. ✅ Cải thiện error handling và connection pooling');
console.log('4. ✅ Thêm graceful shutdown cho production');
console.log('5. ✅ Cập nhật tất cả scripts liên quan');

console.log('\n🚀 Bước tiếp theo:');
console.log('1. Test kết nối: node test-railway-connection.js');
console.log('2. Cập nhật environment variables trên Railway');
console.log('3. Commit và push code');
console.log('4. Redeploy trên Railway');