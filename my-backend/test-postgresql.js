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

async function testDatabase() {
  console.log('🔍 Testing PostgreSQL Database Connection...');
  console.log('📋 Config:', { ...config, password: '***' });
  
  try {
    // Test connection
    console.log('\n1. Testing connection...');
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    // Test basic query
    console.log('\n2. Testing basic query...');
    const result = await client.query('SELECT version()');
    console.log('✅ PostgreSQL Version:', result.rows[0].version);
    
    // Test tables existence
    console.log('\n3. Checking tables...');
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    const tables = await client.query(tablesQuery);
    console.log('✅ Tables found:', tables.rows.length);
    tables.rows.forEach(row => console.log('  -', row.table_name));
    
    // Test sample data
    console.log('\n4. Testing sample data...');
    const sampleQueries = [
      { name: 'Users', query: 'SELECT COUNT(*) as count FROM "Users"' },
      { name: 'DanhMucSanPham', query: 'SELECT COUNT(*) as count FROM "DanhMucSanPham"' },
      { name: 'SanPham', query: 'SELECT COUNT(*) as count FROM "SanPham"' },
      { name: 'DichVu', query: 'SELECT COUNT(*) as count FROM "DichVu"' }
    ];
    
    for (const { name, query } of sampleQueries) {
      try {
        const result = await client.query(query);
        console.log(`✅ ${name}: ${result.rows[0].count} records`);
      } catch (err) {
        console.log(`❌ ${name}: Error - ${err.message}`);
      }
    }
    
    // Test functions
    console.log('\n5. Testing functions...');
    const functionsQuery = `
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_type = 'FUNCTION' 
      AND routine_schema = 'public'
      ORDER BY routine_name;
    `;
    const functions = await client.query(functionsQuery);
    console.log('✅ Functions found:', functions.rows.length);
    functions.rows.forEach(row => console.log('  -', row.routine_name));
    
    // Test triggers
    console.log('\n6. Testing triggers...');
    const triggersQuery = `
      SELECT trigger_name, event_object_table 
      FROM information_schema.triggers 
      WHERE trigger_schema = 'public'
      ORDER BY trigger_name;
    `;
    const triggers = await client.query(triggersQuery);
    console.log('✅ Triggers found:', triggers.rows.length);
    triggers.rows.forEach(row => console.log(`  - ${row.trigger_name} on ${row.event_object_table}`));
    
    // Test sample function call
    console.log('\n7. Testing sample function...');
    try {
      const funcResult = await client.query('SELECT get_product_details(1) as product');
      console.log('✅ Function test successful:', funcResult.rows[0]?.product ? 'Data returned' : 'No data');
    } catch (err) {
      console.log('⚠️ Function test failed:', err.message);
    }
    
    client.release();
    console.log('\n🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run test
if (require.main === module) {
  testDatabase();
}

module.exports = { testDatabase, pool };