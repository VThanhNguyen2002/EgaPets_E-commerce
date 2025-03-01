const sql = require("mssql");

// Cấu hình kết nối SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // Ví dụ: localhost
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Nếu dùng Azure, đổi thành true
    enableArithAbort: true,
  },
};

// Tạo pool kết nối
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Database Connected");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed: ", err);
    process.exit(1);
  });

module.exports = { sql, poolPromise };
