// src/jobs/cleanupCart.js
const cron = require('node-cron');
const { poolPromise, sql } = require('@shared/db/sql');

cron.schedule('0 3 * * *', async () => {        // 03:00 hằng ngày
  const pool = await poolPromise;
  await pool.request()
    .query(`DELETE FROM GioHang WHERE updated_at < DATEADD(DAY,-30,GETDATE())`);
  console.log(`[Cron] Cart cleanup done ${new Date().toISOString()}`);
});
