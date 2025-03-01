require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./src/config"); // Lấy db từ config/index.js
const { poolPromise } = db; // Giữ poolPromise từ db.js

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT COUNT(*) AS Users FROM Users");
    res.send(`Hello from Node.js API! 👋 - Users in DB: ${result.recordset[0].Users}`);
  } catch (error) {
    console.error("❌ Lỗi truy vấn DB:", error);
    res.status(500).send("Lỗi kết nối Database");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
