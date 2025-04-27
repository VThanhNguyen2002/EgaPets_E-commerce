require('dotenv').config();
require('@jobs/cleanupCart');
const express = require('express');
const cors    = require('cors');
const { poolPromise } = require('@shared/db/sql');
const routes  = require('./routes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '40mb' }));

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

/* 404 */
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

/* Error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
