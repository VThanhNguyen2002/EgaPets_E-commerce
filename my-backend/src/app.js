require('dotenv').config();
require('@jobs/cleanupCart');
const express = require('express');
const cors    = require('cors');
const { poolPromise } = require('@shared/db/sql');
const customerRoutes = require('@modules/Customer/customer.routes');

const routes  = require('./routes');
const swaggerRouter = require('./docs/swagger');

const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",  // Lấy từ env hoặc cho phép mọi domain
    credentials: false, // Nếu muốn FE dùng cookie, set true và check lại FE
  })
);

app.use(express.json({ limit: '40mb' }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Health‑check */
app.get('/health', async (_, res) => {
  try {
    console.log('🔍 Health check - Testing database connection...');
    const client = await (await poolPromise).connect();
    const result = await client.query('SELECT 1 AS ok');
    client.release();
    console.log('✅ Health check - Database connection successful');
    res.json({ 
      status: 'UP', 
      db: !!result.rows,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    console.error('📋 Database config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL
    });
    res.status(500).json({ 
      status: 'DOWN', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/* Mount all routes */
app.use('/api', routes);  // routes/index.js sẽ chứa sub‑router

app.use("/api/customers", customerRoutes);

app.use('/api-docs', swaggerRouter);

/* 404 */
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

/* Error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
