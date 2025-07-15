const { Pool } = require('pg');

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
    
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log(`📋 Found ${tablesResult.rows.length} tables:`);
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
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
