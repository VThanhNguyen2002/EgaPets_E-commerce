const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function cleanupAndPopulateDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('🧹 Starting database cleanup and population...');
    
    // 1. Add sample data to empty tables
    console.log('\n📝 Adding sample data to empty tables...');
    
    // Add categories to danhmucsanpham
    const categoryCount = await client.query('SELECT COUNT(*) FROM danhmucsanpham');
    if (categoryCount.rows[0].count === '0') {
      console.log('Adding sample categories to danhmucsanpham...');
      await client.query(`
        INSERT INTO danhmucsanpham (ten_danh_muc) VALUES 
        ('Thức ăn cho chó'),
        ('Thức ăn cho mèo'),
        ('Đồ chơi thú cưng'),
        ('Phụ kiện thú cưng'),
        ('Thuốc và vitamin'),
        ('Vệ sinh thú cưng')
      `);
    }
    
    // Add categories to danh_muc_san_pham
    const categoryCount2 = await client.query('SELECT COUNT(*) FROM danh_muc_san_pham');
    if (categoryCount2.rows[0].count === '0') {
      console.log('Adding sample categories to danh_muc_san_pham...');
      await client.query(`
        INSERT INTO danh_muc_san_pham (ten_danh_muc) VALUES 
        ('Thức ăn cho chó'),
        ('Thức ăn cho mèo'),
        ('Đồ chơi thú cưng'),
        ('Phụ kiện thú cưng'),
        ('Thuốc và vitamin'),
        ('Vệ sinh thú cưng')
      `);
    }
    
    // Get category IDs from both tables
    const categories1 = await client.query('SELECT id, ten_danh_muc FROM danhmucsanpham ORDER BY id');
    console.log('danhmucsanpham categories:', categories1.rows);
    
    const categories2 = await client.query('SELECT id, ten_danh_muc FROM danh_muc_san_pham ORDER BY id');
    console.log('danh_muc_san_pham categories:', categories2.rows);
    
    const categoryMap1 = {};
    categories1.rows.forEach(cat => {
      categoryMap1[cat.ten_danh_muc] = cat.id;
    });
    
    const categoryMap2 = {};
    categories2.rows.forEach(cat => {
      categoryMap2[cat.ten_danh_muc] = cat.id;
    });
    
    // Add products to sanpham table (using danhmucsanpham IDs)
    const sanphamCount = await client.query('SELECT COUNT(*) FROM sanpham');
    console.log(`Current sanpham count: ${sanphamCount.rows[0].count}`);
    
    if (parseInt(sanphamCount.rows[0].count) < 5) {
      console.log('Adding sample products to sanpham...');
      await client.query(`
        INSERT INTO sanpham (ma_san_pham, ten_san_pham, thuong_hieu, loai, gia_thanh, so_luong, danh_muc_id, img_url) VALUES 
        ('RC001', 'Royal Canin Adult', 'Royal Canin', 'Thức ăn khô', 450000, 50, $1, '/images/royal-canin-adult.jpg'),
        ('WH001', 'Whiskas Adult', 'Whiskas', 'Thức ăn ướt', 85000, 100, $2, '/images/whiskas-adult.jpg'),
        ('PD001', 'Pedigree Puppy', 'Pedigree', 'Thức ăn khô', 320000, 30, $1, '/images/pedigree-puppy.jpg'),
        ('ME001', 'Me-O Kitten', 'Me-O', 'Thức ăn khô', 75000, 80, $2, '/images/me-o-kitten.jpg'),
        ('PT001', 'Bóng tennis cho chó', 'Pet Toy', 'Đồ chơi', 25000, 200, $3, '/images/tennis-ball.jpg')
      `, [
        categoryMap1['Thức ăn cho chó'],
        categoryMap1['Thức ăn cho mèo'],
        categoryMap1['Đồ chơi thú cưng']
      ]);
    }
    
    // Add products to san_pham table (using danh_muc_san_pham IDs)
    const san_phamCount = await client.query('SELECT COUNT(*) FROM san_pham');
    console.log(`Current san_pham count: ${san_phamCount.rows[0].count}`);
    
    if (parseInt(san_phamCount.rows[0].count) < 8) {
      console.log('Adding more sample products to san_pham...');
      await client.query(`
        INSERT INTO san_pham (ten_san_pham, mo_ta, gia, so_luong_ton_kho, danh_muc_id, hinh_anh_url, trang_thai) VALUES 
        ($4, 'Thức ăn dinh dưỡng cao cấp cho chó', 520000, 40, $1, '/images/hills-science.jpg', 'active'),
        ('Purina Pro Plan', 'Thức ăn chuyên nghiệp cho mèo', 380000, 60, $2, '/images/purina-pro.jpg', 'active'),
        ('Acana Heritage', 'Thức ăn tự nhiên cho chó', 680000, 25, $1, '/images/acana-heritage.jpg', 'active'),
        ('Orijen Cat Food', 'Thức ăn cao cấp cho mèo', 750000, 35, $2, '/images/orijen-cat.jpg', 'active'),
        ('Kong Classic', 'Đồ chơi cao su bền chắc', 45000, 80, $3, '/images/kong-classic.jpg', 'active')
      `, [
        categoryMap2['Thức ăn cho chó'],
        categoryMap2['Thức ăn cho mèo'],
        categoryMap2['Đồ chơi thú cưng'],
        "Hill's Science Diet"
      ]);
    }
    
    // Add services
    const serviceCount = await client.query('SELECT COUNT(*) FROM dichvu');
    if (serviceCount.rows[0].count === '0') {
      console.log('Adding sample services...');
      await client.query(`
        INSERT INTO dichvu (ten_dich_vu, mo_ta, gia_mac_dinh) VALUES 
        ('Tắm rửa cơ bản', 'Dịch vụ tắm rửa cơ bản cho thú cưng', 100000),
        ('Cắt tỉa lông', 'Dịch vụ cắt tỉa lông chuyên nghiệp', 150000),
        ('Khám sức khỏe tổng quát', 'Khám sức khỏe định kỳ cho thú cưng', 200000),
        ('Tiêm phòng', 'Dịch vụ tiêm phòng đầy đủ', 300000),
        ('Spa thú cưng', 'Dịch vụ spa cao cấp', 500000)
      `);
      
      // Get service IDs
      const services = await client.query('SELECT id, ten_dich_vu FROM dichvu ORDER BY id');
      console.log('Available services:', services.rows);
      
      const serviceMap = {};
      services.rows.forEach(service => {
        serviceMap[service.ten_dich_vu] = service.id;
      });
      
      // Add service details using actual service IDs
      if (services.rows.length >= 2) {
        const tamRuaId = serviceMap['Tắm rửa cơ bản'];
        const catTiaId = serviceMap['Cắt tỉa lông'];
        
        await client.query(`
          INSERT INTO dichvuchitiet (dich_vu_id, can_nang, loai_long, gia) VALUES 
          ($1, '<3kg', 'Ngắn', 80000),
          ($1, '<3kg', 'Dài', 100000),
          ($1, '3-5kg', 'Ngắn', 100000),
          ($1, '3-5kg', 'Dài', 120000),
          ($1, '5-10kg', 'Ngắn', 120000),
          ($1, '5-10kg', 'Dài', 150000),
          ($1, '10-20kg', 'Ngắn', 180000),
          ($1, '10-20kg', 'Dài', 220000),
          ($1, '>20kg', 'Ngắn', 250000),
          ($1, '>20kg', 'Dài', 300000),
          ($2, '<3kg', 'Ngắn', 120000),
          ($2, '<3kg', 'Dài', 150000),
          ($2, '3-5kg', 'Ngắn', 150000),
          ($2, '3-5kg', 'Dài', 180000),
          ($2, '5-10kg', 'Ngắn', 180000),
          ($2, '5-10kg', 'Dài', 220000),
          ($2, '10-20kg', 'Ngắn', 250000),
          ($2, '10-20kg', 'Dài', 300000),
          ($2, '>20kg', 'Ngắn', 350000),
          ($2, '>20kg', 'Dài', 400000)
        `, [tamRuaId, catTiaId]);
      }
    }
    
    await client.query('COMMIT');
    console.log('\n✅ Database cleanup and population completed successfully!');
    
    // Show final counts
    console.log('\n📊 Final data counts:');
    const tables = ['danhmucsanpham', 'danh_muc_san_pham', 'sanpham', 'san_pham', 'dichvu', 'dichvuchitiet', 'khachhang'];
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`- ${table}: ${result.rows[0].count} records`);
      } catch (error) {
        console.log(`- ${table}: Table not accessible`);
      }
    }
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error during cleanup and population:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

cleanupAndPopulateDatabase().catch(console.error);