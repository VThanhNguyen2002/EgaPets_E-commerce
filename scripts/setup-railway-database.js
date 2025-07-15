const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Railway PostgreSQL connection configuration
const connectionConfig = {
    host: 'yamanote.proxy.rlwy.net',
    port: 30023,
    user: 'postgres',
    password: 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
    database: 'railway',
    ssl: {
        rejectUnauthorized: false // Railway requires SSL
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    query_timeout: 60000
};

async function setupRailwayDatabase() {
    const client = new Client(connectionConfig);
    
    try {
        console.log('🔄 Connecting to Railway PostgreSQL...');
        console.log(`📍 Host: ${connectionConfig.host}:${connectionConfig.port}`);
        console.log(`🗄️  Database: ${connectionConfig.database}`);
        
        await client.connect();
        console.log('✅ Connected to Railway PostgreSQL successfully!');
        
        // Test connection
        const result = await client.query('SELECT version()');
        console.log('📊 PostgreSQL Version:', result.rows[0].version);
        
        // Read and execute the Railway SQL script
        const sqlFilePath = path.join(__dirname, '..', 'Database', 'EgaPets_PostgreSQL_Railway.sql');
        
        if (!fs.existsSync(sqlFilePath)) {
            throw new Error(`SQL file not found: ${sqlFilePath}`);
        }
        
        console.log('📖 Reading SQL script...');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
        
        console.log('🚀 Executing database setup script...');
        await client.query(sqlContent);
        
        console.log('✅ Database setup completed successfully!');
        
        // Verify tables were created
        console.log('🔍 Verifying tables...');
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);
        
        console.log('📋 Created tables:');
        tablesResult.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
        
        // Check sample data
        console.log('\n🔍 Checking sample data...');
        const userCount = await client.query('SELECT COUNT(*) as count FROM Users');
        const paymentCount = await client.query('SELECT COUNT(*) as count FROM PhuongThucThanhToan');
        
        console.log(`👥 Users: ${userCount.rows[0].count}`);
        console.log(`💳 Payment Methods: ${paymentCount.rows[0].count}`);
        
        console.log('\n🎉 Railway database setup completed successfully!');
        console.log('\n📝 Connection details for your application:');
        console.log('DATABASE_URL=postgresql://postgres:sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM@yamanote.proxy.rlwy.net:30023/railway');
        
    } catch (error) {
        console.error('❌ Error setting up Railway database:', error.message);
        console.error('🔍 Error details:', error);
        
        if (error.code) {
            console.error(`📋 Error Code: ${error.code}`);
        }
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Connection refused. Please check:');
            console.error('   - Railway service is running');
            console.error('   - Connection details are correct');
            console.error('   - Network connectivity');
        }
        
        if (error.code === 'ENOTFOUND') {
            console.error('💡 Host not found. Please verify the Railway hostname.');
        }
        
        process.exit(1);
    } finally {
        await client.end();
        console.log('🔌 Database connection closed.');
    }
}

// Run the setup
if (require.main === module) {
    setupRailwayDatabase();
}

module.exports = { setupRailwayDatabase, connectionConfig };