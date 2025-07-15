const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function checkTableStructures() {
  try {
    console.log('🔍 Checking table structures for duplicates...');
    
    const duplicatePairs = [
      ['danhmucsanpham', 'danh_muc_san_pham'],
      ['sanpham', 'san_pham'],
      ['khachhang', 'khach_hang']
    ];
    
    for (const [table1, table2] of duplicatePairs) {
      console.log(`\n📋 Comparing ${table1} vs ${table2}:`);
      
      // Check structure of table1
      try {
        const structure1 = await pool.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = $1 AND table_schema = 'public'
          ORDER BY ordinal_position
        `, [table1]);
        
        console.log(`\n${table1} structure:`);
        structure1.rows.forEach(col => {
          console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default ? `DEFAULT ${col.column_default}` : ''}`);
        });
        
        // Check data count
        const count1 = await pool.query(`SELECT COUNT(*) FROM ${table1}`);
        console.log(`  Records: ${count1.rows[0].count}`);
        
      } catch (error) {
        console.log(`  ${table1}: Table not found`);
      }
      
      // Check structure of table2
      try {
        const structure2 = await pool.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = $1 AND table_schema = 'public'
          ORDER BY ordinal_position
        `, [table2]);
        
        console.log(`\n${table2} structure:`);
        structure2.rows.forEach(col => {
          console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default ? `DEFAULT ${col.column_default}` : ''}`);
        });
        
        // Check data count
        const count2 = await pool.query(`SELECT COUNT(*) FROM ${table2}`);
        console.log(`  Records: ${count2.rows[0].count}`);
        
      } catch (error) {
        console.log(`  ${table2}: Table not found`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking table structures:', error.message);
  } finally {
    await pool.end();
  }
}

checkTableStructures();