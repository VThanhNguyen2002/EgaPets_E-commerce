const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection config
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'YourStrongPassw0rd',
  database: process.env.DB_NAME || 'egapets_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

const pool = new Pool(config);

async function setupDatabase() {
  console.log('🚀 Setting up PostgreSQL Database for EgaPets...');
  
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Read and execute SQL files in order
    const sqlFiles = [
      '../../Database/EgaPets_PostgreSQL.sql',
      '../../Database/EgaPets_PostgreSQL_Data.sql',
      '../../Database/EgaPets_PostgreSQL_Roles.sql',
      '../../Database/EgaPets_PostgreSQL_Functions.sql',
      '../../Database/EgaPets_PostgreSQL_Triggers.sql'
    ];
    
    for (const sqlFile of sqlFiles) {
      const filePath = path.join(__dirname, sqlFile);
      
      if (fs.existsSync(filePath)) {
        console.log(`\n📄 Executing ${path.basename(sqlFile)}...`);
        const sqlContent = fs.readFileSync(filePath, 'utf8');
        
        // Split by semicolon and execute each statement
        const statements = sqlContent
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        for (const statement of statements) {
          try {
            await client.query(statement);
          } catch (err) {
            if (!err.message.includes('already exists')) {
              console.warn(`⚠️ Warning in ${path.basename(sqlFile)}:`, err.message);
            }
          }
        }
        
        console.log(`✅ ${path.basename(sqlFile)} executed successfully`);
      } else {
        console.log(`⚠️ File not found: ${sqlFile}`);
      }
    }
    
    // Verify setup
    console.log('\n🔍 Verifying database setup...');
    
    const tablesResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const functionsResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.routines 
      WHERE routine_type = 'FUNCTION' AND routine_schema = 'public'
    `);
    
    const triggersResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.triggers 
      WHERE trigger_schema = 'public'
    `);
    
    console.log(`✅ Tables created: ${tablesResult.rows[0].count}`);
    console.log(`✅ Functions created: ${functionsResult.rows[0].count}`);
    console.log(`✅ Triggers created: ${triggersResult.rows[0].count}`);
    
    client.release();
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Update your .env file with PostgreSQL credentials');
    console.log('2. Run: npm run test:db');
    console.log('3. Start your application: npm run dev');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run setup
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };