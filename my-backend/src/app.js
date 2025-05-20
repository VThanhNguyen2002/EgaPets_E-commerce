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
    const rs = await (await poolPromise)
      .request().query('SELECT 1 AS ok');
    res.json({ status: 'UP', db: !!rs });
  } catch {
    res.status(500).json({ status: 'DOWN' });
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
