require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Railway PostgreSQL connection config
const config = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

const pool = new Pool(config);

async function setupRailwayDatabase() {
  console.log('🚀 Setting up PostgreSQL Database on Railway...');
  console.log('📋 Config:', { ...config, password: '***' });
  
  try {
    const client = await pool.connect();
    console.log('✅ Connected to Railway PostgreSQL');
    
    // Check if tables already exist
    console.log('\n🔍 Checking existing tables...');
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
      
      // Ask if we should continue (in production, we might want to skip)
      console.log('\n⚠️ Database already has tables. Continuing with setup...');
    }
    
    // Read and execute SQL files in order
    const sqlFiles = [
      '../../Database/EgaPets_PostgreSQL.sql',
      '../../Database/EgaPets_PostgreSQL_Data.sql',
      '../../Database/EgaPets_PostgreSQL_Functions.sql',
      '../../Database/EgaPets_PostgreSQL_Triggers.sql'
    ];
    
    for (const sqlFile of sqlFiles) {
      const filePath = path.join(__dirname, sqlFile);
      
      if (fs.existsSync(filePath)) {
        console.log(`\n📄 Executing ${path.basename(sqlFile)}...`);
        
        try {
          const sqlContent = fs.readFileSync(filePath, 'utf8');
          
          // Skip database creation commands for Railway
          const cleanedSql = sqlContent
            .replace(/DROP DATABASE IF EXISTS egapets_db;/gi, '-- Skipped: DROP DATABASE')
            .replace(/CREATE DATABASE egapets_db;/gi, '-- Skipped: CREATE DATABASE')
            .replace(/\\c egapets_db;/gi, '-- Skipped: USE DATABASE');
          
          // Split by semicolon and execute each statement
          const statements = cleanedSql
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt && !stmt.startsWith('--') && stmt !== '');
          
          for (const statement of statements) {
            if (statement.trim()) {
              try {
                await client.query(statement);
              } catch (stmtError) {
                // Log but continue for non-critical errors
                if (!stmtError.message.includes('already exists')) {
                  console.warn(`⚠️ Statement warning: ${stmtError.message}`);
                }
              }
            }
          }
          
          console.log(`✅ Completed ${path.basename(sqlFile)}`);
        } catch (fileError) {
          console.error(`❌ Error executing ${path.basename(sqlFile)}:`, fileError.message);
        }
      } else {
        console.log(`⚠️ File not found: ${sqlFile}`);
      }
    }
    
    // Verify setup
    console.log('\n🔍 Verifying database setup...');
    const finalTablesQuery = await client.query(tablesQuery);
    console.log(`✅ Database now has ${finalTablesQuery.rows.length} tables`);
    
    // Test a simple query
    console.log('\n🧪 Testing database functionality...');
    const testQuery = await client.query('SELECT COUNT(*) as count FROM "Users"');
    console.log(`✅ Users table has ${testQuery.rows[0].count} records`);
    
    client.release();
    console.log('\n🎉 Railway database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Railway database setup failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run setup
if (require.main === module) {
  setupRailwayDatabase();
}

module.exports = { setupRailwayDatabase };