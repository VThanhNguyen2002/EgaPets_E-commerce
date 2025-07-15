const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function checkDatabaseTables() {
  try {
    console.log('🔍 Checking database tables...');
    
    // Get all tables
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📋 All tables in database:');
    tablesResult.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
    // Check for duplicate table names (case variations)
    const tableNames = tablesResult.rows.map(row => row.table_name.toLowerCase());
    const duplicates = tableNames.filter((name, index) => tableNames.indexOf(name) !== index);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️  Potential duplicate tables (case variations):');
      duplicates.forEach(name => console.log(`- ${name}`));
    } else {
      console.log('\n✅ No duplicate table names found');
    }
    
    // Check data in key tables
    const keyTables = ['danhmucsanpham', 'sanpham', 'dichvu', 'khachhang'];
    
    console.log('\n📊 Data count in key tables:');
    for (const tableName of keyTables) {
      try {
        const countResult = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
        console.log(`- ${tableName}: ${countResult.rows[0].count} records`);
      } catch (error) {
        console.log(`- ${tableName}: Table not found or error - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    await pool.end();
  }
}

checkDatabaseTables();