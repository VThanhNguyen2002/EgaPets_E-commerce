require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("✅ Database Connected");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1);
  });

/* helper query dùng Promise */
async function query(sqlString, params = []) {
  const p = await poolPromise;
  const req = p.request();
  params.forEach(({ name, type, value }) => req.input(name, type, value));
  const result = await req.query(sqlString);
  return result.recordset;
}

function getPool() {
  return poolPromise;
}

module.exports = { sql, dbConfig, poolPromise, query, getPool };
