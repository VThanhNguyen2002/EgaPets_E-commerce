require('dotenv').config();
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
    console.log('
🔍 Checking existing tables...');
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    const existingTables = await client.query(tablesQuery);
    console.log(`📊 Found ${existingTables.rows.length} existing tables`);
    
    if (existingTables.rows.length > 0) {
      console.log('📋 Existing tables:', existingTables.rows.map(r => r.table_name).join(', '));
      console.log('
⚠️ Database already has tables. Skipping setup to avoid conflicts...');
      return;
    }
    
    // Only setup if no tables exist
    console.log('
🔧 Setting up fresh database...');
    
    // Read and execute the complete database SQL file
    const sqlFilePath = path.join(__dirname, '../../complete-database-with-data.sql');
    
    if (fs.existsSync(sqlFilePath)) {
      console.log('📄 Executing complete-database-with-data.sql...');
      
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      
      // Clean SQL for Railway (remove database creation commands)
      const cleanedSql = sqlContent
        .replace(/DROP DATABASE IF EXISTS.*?;/gi, '')
        .replace(/CREATE DATABASE.*?;/gi, '')
        .replace(/\\c.*?;/gi, '')
        .replace(/USE.*?;/gi, '');
      
      // Execute in transaction for safety
      await client.query('BEGIN');
      
      try {
        // Split and execute statements
        const statements = cleanedSql
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt && !stmt.startsWith('--') && stmt.length > 5);
        
        console.log(`📝 Executing ${statements.length} SQL statements...`);
        
        for (let i = 0; i < statements.length; i++) {
          const statement = statements[i];
          if (statement.trim()) {
            try {
              await client.query(statement);
              if (i % 10 === 0) {
                console.log(`   Progress: ${i + 1}/${statements.length}`);
              }
            } catch (stmtError) {
              if (!stmtError.message.includes('already exists')) {
                console.warn(`⚠️ Statement ${i + 1} warning: ${stmtError.message}`);
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
      await client.query(`
        CREATE TABLE IF NOT EXISTS "Users" (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'customer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('✅ Basic table structure created');
    }
    
    // Verify setup
    console.log('
🔍 Verifying database setup...');
    const finalTablesQuery = await client.query(tablesQuery);
    console.log(`✅ Database now has ${finalTablesQuery.rows.length} tables`);
    
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
