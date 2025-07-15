const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function generateFinalReport() {
  const client = await pool.connect();
  
  try {
    console.log('📊 FINAL DATABASE REPORT - EgaPets');
    console.log('=' .repeat(50));
    
    // Check all important tables
    const tables = [
      'users', 'khachhang', 'nhanvien',
      'danhmucsanpham', 'danh_muc_san_pham', 
      'sanpham', 'san_pham',
      'dichvu', 'dichvuchitiet',
      'phuongthucthanhtoan', 'giohang', 'hoadon'
    ];
    
    console.log('\n🗂️  TABLE DATA SUMMARY:');
    console.log('-'.repeat(40));
    
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        const count = result.rows[0].count;
        const status = count > 0 ? '✅' : '❌';
        console.log(`${status} ${table.padEnd(20)} : ${count.padStart(3)} records`);
      } catch (error) {
        console.log(`❓ ${table.padEnd(20)} : Table not found`);
      }
    }
    
    // Check duplicate tables issue
    console.log('\n🔍 DUPLICATE TABLES ANALYSIS:');
    console.log('-'.repeat(40));
    
    const duplicatePairs = [
      ['danhmucsanpham', 'danh_muc_san_pham'],
      ['sanpham', 'san_pham'],
      ['khachhang', 'khach_hang']
    ];
    
    for (const [table1, table2] of duplicatePairs) {
      try {
        const count1 = await client.query(`SELECT COUNT(*) FROM ${table1}`);
        const count2 = await client.query(`SELECT COUNT(*) FROM ${table2}`);
        
        console.log(`📋 ${table1} vs ${table2}:`);
        console.log(`   - ${table1}: ${count1.rows[0].count} records`);
        console.log(`   - ${table2}: ${count2.rows[0].count} records`);
        
        if (count1.rows[0].count > 0 && count2.rows[0].count > 0) {
          console.log('   ⚠️  Both tables have data - consider migration');
        } else if (count1.rows[0].count > 0) {
          console.log('   ℹ️  Only old table has data');
        } else if (count2.rows[0].count > 0) {
          console.log('   ✅ Only new table has data');
        }
        console.log('');
      } catch (error) {
        console.log(`   ❓ Error checking ${table1}/${table2}`);
      }
    }
    
    // Sample data preview
    console.log('\n📝 SAMPLE DATA PREVIEW:');
    console.log('-'.repeat(40));
    
    // Users
    try {
      const users = await client.query('SELECT username, role, email FROM users LIMIT 5');
      console.log('\n👥 Users:');
      users.rows.forEach(user => {
        console.log(`   - ${user.username} (${user.role}) - ${user.email}`);
      });
    } catch (error) {
      console.log('❌ Could not fetch users data');
    }
    
    // Products from both tables
    try {
      const products1 = await client.query('SELECT ten_san_pham, gia_thanh FROM sanpham LIMIT 3');
      console.log('\n🛍️  Products (sanpham):');
      products1.rows.forEach(product => {
        console.log(`   - ${product.ten_san_pham}: ${product.gia_thanh.toLocaleString()}đ`);
      });
    } catch (error) {
      console.log('❌ Could not fetch sanpham data');
    }
    
    try {
      const products2 = await client.query('SELECT ten_san_pham, gia FROM san_pham LIMIT 3');
      console.log('\n🛍️  Products (san_pham):');
      products2.rows.forEach(product => {
        console.log(`   - ${product.ten_san_pham}: ${product.gia.toLocaleString()}đ`);
      });
    } catch (error) {
      console.log('❌ Could not fetch san_pham data');
    }
    
    // Services
    try {
      const services = await client.query('SELECT ten_dich_vu, gia_mac_dinh FROM dichvu');
      console.log('\n🔧 Services:');
      services.rows.forEach(service => {
        console.log(`   - ${service.ten_dich_vu}: ${service.gia_mac_dinh.toLocaleString()}đ`);
      });
    } catch (error) {
      console.log('❌ Could not fetch services data');
    }
    
    // Service details count
    try {
      const serviceDetails = await client.query('SELECT COUNT(*) FROM dichvuchitiet');
      console.log(`\n💰 Service pricing details: ${serviceDetails.rows[0].count} price variations`);
    } catch (error) {
      console.log('❌ Could not fetch service details');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ DATABASE REPORT COMPLETED');
    console.log('📁 Files created:');
    console.log('   - complete-database-with-data.sql (Complete DB structure + data)');
    console.log('   - DATABASE_SETUP_GUIDE.md (Setup instructions)');
    console.log('   - cleanup-and-populate-database.js (Data population script)');
    console.log('\n🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Error generating report:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

generateFinalReport().catch(console.error);