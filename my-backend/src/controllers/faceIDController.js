// src/controllers/faceIDController.js
require('dotenv').config();
const { sql, poolPromise } = require('../config/db.js');
const { computeCosineDistance } = require('../utils/faceUtils');

const insertFaceID = async (req, res) => {
  try {
    const pool = await poolPromise;

    const { userId, faceVectorBase64, pose } = req.body;
    if (!userId || !faceVectorBase64) {
      return res.status(400).json({ error: 'Missing userId or faceVectorBase64' });
    }

    // Chuyển base64 => buffer
    const faceVectorBuffer = Buffer.from(faceVectorBase64, 'base64');

    // Gọi stored procedure usp_insertFaceID
    const result = await pool.request()
      .input('UserID', sql.Int, userId)
      .input('FaceVector', sql.VarBinary, faceVectorBuffer)
      .input('Pose', sql.NVarChar, pose || null)
      .execute('usp_insertFaceID');

    return res.status(200).json({
      message: 'Face ID inserted successfully',
      data: result.recordset,
    });
  } catch (error) {
    console.error('Error inserting Face ID:', error);
    return res.status(500).json({ error: 'Error inserting Face ID' });
  }
};

// Hàm verify-face (login)
const verifyFace = async (req, res) => {
  try {
    const pool = await poolPromise;

    const { userId, faceVectorBase64 } = req.body;
    if (!userId || !faceVectorBase64) {
      return res.status(400).json({ error: 'Missing userId or faceVectorBase64' });
    }

    // Threshold từ .env (mặc định 0.4)
    const threshold = process.env.FACE_THRESHOLD 
      ? parseFloat(process.env.FACE_THRESHOLD) 
      : 0.4;

    // Lấy IP client (có thể tuỳ chỉnh)
    const ipAddress = req.ip; 
    // Hoặc xài req.headers['x-forwarded-for'] nếu qua proxy

    // Lấy device info từ user-agent
    const userAgent = req.headers['user-agent'] || '';

    // 1) Tạo buffer từ base64
    const newFaceBuffer = Buffer.from(faceVectorBase64, 'base64');

    // 2) Lấy tất cả FaceID của user
    const faceQuery = await pool.request()
      .input('UserId', sql.Int, userId)
      .query(`
        SELECT id, face_vector 
        FROM FaceID 
        WHERE user_id = @UserId
      `);

    if (faceQuery.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found or no FaceID enrolled' });
    }

    // 3) So sánh với từng embedding, lấy minDistance
    let minDistance = Number.MAX_VALUE;
    for (let row of faceQuery.recordset) {
      const dbFaceBuffer = row.face_vector;
      const distance = computeCosineDistance(newFaceBuffer, dbFaceBuffer);
      if (distance < minDistance) {
        minDistance = distance;
      }
    }

    // 4) Check threshold
    const isMatched = (minDistance < threshold);

    // 5) Ghi log
    await pool.request()
      .input('UserId', sql.Int, userId)
      .input('Action', sql.NVarChar, 'verify')
      .input('Result', sql.NVarChar, isMatched ? 'success' : 'fail')
      .input('Distance', sql.Float, minDistance)
      .input('IpAddress', sql.NVarChar, ipAddress)
      .input('DeviceInfo', sql.NVarChar, userAgent)
      .query(`
        INSERT INTO FaceIDLogs (user_id, action, result, distance, ip_address, device_info)
        VALUES (@UserId, @Action, @Result, @Distance, @IpAddress, @DeviceInfo)
      `);

    // 6) Trả kết quả
    if (isMatched) {
      return res.status(200).json({
        message: 'Login success',
        distance: minDistance
      });
    } else {
      return res.status(401).json({
        message: 'Login failed',
        distance: minDistance
      });
    }
  } catch (error) {
    console.error('Error verifying face:', error);
    return res.status(500).json({ error: 'Error verifying face' });
  }
};

module.exports = { insertFaceID, verifyFace };
