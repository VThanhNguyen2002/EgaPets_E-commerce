require('dotenv').config();
const axios = require('axios');
const { sql, poolPromise } = require('@shared/db/sql');
const { sign } = require('@shared/jwt');
const { computeCosineDistance } = require('@modules/Faceid/faceUtils');

const PY_SERVICE = process.env.PY_SVC_URL;
const THRESHOLD  = parseFloat(process.env.FACE_THRESHOLD || '0.4');

// Hàm so sánh vector cosine
function compareEmbeddings(vec1, vec2) {
  const distance = computeCosineDistance(vec1, vec2);
  return distance < THRESHOLD;
}

async function enrollByImage({ userId, imgBase64, pose, authHeader }) {
  // gọi Python
  const pyRes = await axios.post(
    `${PY_SERVICE}/extract-embedding`,
    { img_base64: imgBase64 },
    { headers: { Authorization: authHeader } }
  );
  const embeddingB64 = pyRes.data.embedding_base64;
  return enrollRawVector({ userId, embeddingB64, pose });
}

async function enrollRawVector({ userId, embeddingB64, pose = null }) {
  const pool   = await poolPromise;
  const buffer = Buffer.from(embeddingB64, 'base64');

  const rs = await pool.request()
    .input('UserID',     sql.Int,      userId)
    .input('FaceVector', sql.VarBinary, buffer)
    .input('Pose',       sql.NVarChar, pose)
    .execute('usp_insertFaceID');

  return rs.recordset;
}

async function verify({ userId, faceVectorB64, meta }) {
  const pool = await poolPromise;
  const newBuf = Buffer.from(faceVectorB64, 'base64');

  const rs = await pool.request()
    .input('UserId', sql.Int, userId)
    .query('SELECT face_vector FROM FaceID WHERE user_id = @UserId');

  if (!rs.recordset.length) return { code: 404, msg: 'User not found or no FaceID enrolled' };

  let min = Infinity;
  for (const { face_vector } of rs.recordset) {
    const d = computeCosineDistance(newBuf, face_vector);
    if (d < min) min = d;
  }
  const matched = min < THRESHOLD;

  // ghi log
  await pool.request()
    .input('UserId',     sql.Int,      userId)
    .input('Action',     sql.NVarChar, 'verify')
    .input('Result',     sql.NVarChar, matched ? 'success' : 'fail')
    .input('Distance',   sql.Float,    min)
    .input('IpAddress',  sql.NVarChar, meta.ip)
    .input('DeviceInfo', sql.NVarChar, meta.ua)
    .query(`
      INSERT INTO FaceIDLogs (user_id, action, result, distance, ip_address, device_info)
      VALUES (@UserId, @Action, @Result, @Distance, @IpAddress, @DeviceInfo)
    `);

  return { code: matched ? 200 : 401, data: { message: matched ? 'Login success' : 'Login failed', distance: min } };
}


async function verifyMulti({ userId, images }) {
  const pool = await poolPromise;

  // 1. Lấy embedding theo từng pose từ bảng FaceID
  const rs = await pool.request()
    .input('user_id', sql.Int, userId)
    .query(`
      SELECT pose, face_vector 
      FROM FaceID 
      WHERE user_id = @user_id
    `);

  const refVectors = rs.recordset.reduce((acc, row) => {
    acc[row.pose] = row.face_vector;
    return acc;
  }, {});

  if (Object.keys(refVectors).length === 0) {
    return { code: 404, msg: 'Không tìm thấy vector khuôn mặt cho user này' };
  }

  // 2. So khớp từng ảnh với vector tương ứng
  for (const img of images) {
    const refVec = refVectors[img.pose];
    if (!refVec) return { code: 400, msg: `Thiếu vector cho pose ${img.pose} trong cơ sở dữ liệu` };

    const query = Buffer.from(img.base64, 'base64');
    const ok = await compareEmbeddings(refVec, query);
    if (!ok) return { code: 401, msg: `Pose ${img.pose} không khớp` };
  }

  // 3. Phát JWT token nếu tất cả ảnh đều khớp
  const token = sign({ id: userId, role: 'NhanVien' });

  return {
    code: 200,
    data: {
      token,
      username: `NV${userId}`,
      role: 'NhanVien'
    }
  };
}


module.exports = { enrollByImage, enrollRawVector, verify, verifyMulti };
