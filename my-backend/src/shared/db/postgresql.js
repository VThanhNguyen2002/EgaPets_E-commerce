require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL connection config
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ PostgreSQL Pool Error:', err);
});

// Test connection on startup
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL Database Connected");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL Database Connection Failed:", err);
    process.exit(1);
  });

/* helper query function */
async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

/* Get pool instance */
function getPool() {
  return pool;
}

module.exports = { pool, dbConfig, query, getPool };