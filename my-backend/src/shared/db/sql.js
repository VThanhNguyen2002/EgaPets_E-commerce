require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL connection config for Railway
const dbConfig = {
  host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 31543,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM',
  database: process.env.DB_NAME || 'railway',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
  // Connection pool settings optimized for Railway
  max: 10, // Reduced from 20 for Railway limits
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Increased timeout
  acquireTimeoutMillis: 60000, // Added acquire timeout
  createTimeoutMillis: 30000, // Added create timeout
};

console.log('🔗 Database Config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  ssl: !!dbConfig.ssl
});

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ PostgreSQL Pool Error:', err.message);
});

pool.on('connect', (client) => {
  console.log('✅ New client connected to PostgreSQL');
});

pool.on('remove', (client) => {
  console.log('🔄 Client removed from pool');
});

// Test connection and create poolPromise for backward compatibility
const poolPromise = (async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Database Connected Successfully");
    console.log(`📊 Connected to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('🔍 PostgreSQL Version:', result.rows[0].version.split(' ')[0]);
    
    client.release();
    return pool;
  } catch (err) {
    console.error("❌ PostgreSQL Database Connection Failed:", err.message);
    console.error("🔧 Troubleshooting:");
    console.error("   1. Check if Railway database is running");
    console.error("   2. Verify environment variables");
    console.error("   3. Check network connectivity");
    
    // Don't exit in production, let the app handle gracefully
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw err;
  }
})();

/* helper query function for PostgreSQL */
async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('❌ Query Error:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

function getPool() {
  return pool;
}

// For backward compatibility, create sql object with common methods
const sql = {
  Int: 'INTEGER',
  NVarChar: 'VARCHAR',
  VarBinary: 'BYTEA',
  Decimal: 'DECIMAL',
  DateTime: 'TIMESTAMP',
  Bit: 'BOOLEAN'
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

module.exports = { sql, dbConfig, poolPromise, query, getPool, pool };
