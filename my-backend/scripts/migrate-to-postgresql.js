const sql = require('mssql');
const { Pool } = require('pg');
require('dotenv').config();

// SQL Server config
const sqlServerConfig = {
  server: process.env.DB_SERVER || 'ADMIN-PC',
  port: parseInt(process.env.DB_PORT) || 1433,
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'EgaPets_DB',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  }
};

// PostgreSQL config
const pgConfig = {
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'YourStrongPassw0rd',
  database: process.env.PG_DATABASE || 'egapets_db',
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
};

const pgPool = new Pool(pgConfig);

// Tables to migrate (in order due to foreign key constraints)
const tablesToMigrate = [
  'Users',
  'PasswordResets',
  'EmailOtp',
  'NhanVien',
  'KhachHang',
  'DanhMucSanPham',
  'SanPham',
  'SanPhamAnh',
  'DanhSachYeuThich',
  'GioHang',
  'PhuongThucThanhToan',
  'DichVu',
  'DichVuChiTiet',
  'LichHen',
  'HoaDon',
  'ChiTietHoaDon',
  'LichSuSanPham',
  'ChiTietThanhToan',
  'FaceID',
  'FaceIDLogs'
];

async function migrateData() {
  console.log('🔄 Starting data migration from SQL Server to PostgreSQL...');
  
  let sqlServerPool;
  let pgClient;
  
  try {
    // Connect to SQL Server
    console.log('📡 Connecting to SQL Server...');
    sqlServerPool = await sql.connect(sqlServerConfig);
    console.log('✅ Connected to SQL Server');
    
    // Connect to PostgreSQL
    console.log('📡 Connecting to PostgreSQL...');
    pgClient = await pgPool.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Start transaction
    await pgClient.query('BEGIN');
    
    let totalRecords = 0;
    
    for (const tableName of tablesToMigrate) {
      try {
        console.log(`\n📋 Migrating table: ${tableName}`);
        
        // Check if table exists in SQL Server
        const checkTableQuery = `
          SELECT COUNT(*) as count 
          FROM INFORMATION_SCHEMA.TABLES 
          WHERE TABLE_NAME = '${tableName}'
        `;
        
        const tableExists = await sqlServerPool.request().query(checkTableQuery);
        
        if (tableExists.recordset[0].count === 0) {
          console.log(`⚠️ Table ${tableName} not found in SQL Server, skipping...`);
          continue;
        }
        
        // Get data from SQL Server
        const selectQuery = `SELECT * FROM [${tableName}]`;
        const result = await sqlServerPool.request().query(selectQuery);
        
        if (result.recordset.length === 0) {
          console.log(`📭 Table ${tableName} is empty, skipping...`);
          continue;
        }
        
        console.log(`📊 Found ${result.recordset.length} records in ${tableName}`);
        
        // Clear existing data in PostgreSQL
        await pgClient.query(`DELETE FROM "${tableName}"`);
        
        // Prepare insert statement
        const columns = Object.keys(result.recordset[0]);
        const quotedColumns = columns.map(col => `"${col}"`);
        const placeholders = columns.map((_, index) => `$${index + 1}`);
        
        const insertQuery = `
          INSERT INTO "${tableName}" (${quotedColumns.join(', ')}) 
          VALUES (${placeholders.join(', ')})
        `;
        
        // Insert data
        let insertedCount = 0;
        for (const row of result.recordset) {
          try {
            const values = columns.map(col => {
              let value = row[col];
              
              // Handle special data types
              if (value instanceof Date) {
                return value.toISOString();
              }
              if (typeof value === 'boolean') {
                return value;
              }
              if (value === null || value === undefined) {
                return null;
              }
              
              return value;
            });
            
            await pgClient.query(insertQuery, values);
            insertedCount++;
          } catch (insertError) {
            console.warn(`⚠️ Failed to insert record in ${tableName}:`, insertError.message);
          }
        }
        
        console.log(`✅ Migrated ${insertedCount}/${result.recordset.length} records for ${tableName}`);
        totalRecords += insertedCount;
        
        // Reset sequence for tables with auto-increment
        try {
          const sequenceQuery = `
            SELECT setval(pg_get_serial_sequence('"${tableName}"', 'id'), 
                         COALESCE(MAX(id), 1)) 
            FROM "${tableName}"
          `;
          await pgClient.query(sequenceQuery);
        } catch (seqError) {
          // Ignore if no sequence exists
        }
        
      } catch (tableError) {
        console.error(`❌ Error migrating table ${tableName}:`, tableError.message);
      }
    }
    
    // Commit transaction
    await pgClient.query('COMMIT');
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📊 Total records migrated: ${totalRecords}`);
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    for (const tableName of tablesToMigrate) {
      try {
        const countResult = await pgClient.query(`SELECT COUNT(*) as count FROM "${tableName}"`);
        const count = countResult.rows[0].count;
        if (count > 0) {
          console.log(`✅ ${tableName}: ${count} records`);
        }
      } catch (err) {
        // Ignore verification errors
      }
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (pgClient) {
      try {
        await pgClient.query('ROLLBACK');
        console.log('🔄 Transaction rolled back');
      } catch (rollbackError) {
        console.error('❌ Rollback failed:', rollbackError.message);
      }
    }
    
    process.exit(1);
  } finally {
    // Close connections
    if (sqlServerPool) {
      await sqlServerPool.close();
      console.log('📡 SQL Server connection closed');
    }
    
    if (pgClient) {
      pgClient.release();
      console.log('📡 PostgreSQL connection closed');
    }
    
    await pgPool.end();
  }
}

// Run migration
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };