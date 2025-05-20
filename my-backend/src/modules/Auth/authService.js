const { sql, poolPromise } = require('@shared/db/sql');
const { hashBuffer, hashHex } = require('@shared/security/hash');
const { sign } = require('@shared/jwt');
const { sendMail }         = require('@shared/helpers/mailer');

const crypto               = require('crypto');
const dayjs                = require('dayjs');


async function fetchUserByUsername(username) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('username', sql.NVarChar, username)
    .query('SELECT * FROM Users WHERE username = @username');
  return rs.recordset[0];
}

/* ---------------- LOGIN ---------------- */
async function login({ username, password }) {
  const pool = await poolPromise;

  /* 1. Tìm user */
  const { recordset:[user] } = await pool.request()
    .input('u', sql.NVarChar, username)
    .query('SELECT * FROM Users WHERE username = @u');

  if (!user)
    return { code: 404, msg: 'Tài khoản không tồn tại. Vui lòng đăng ký!' };

  /* 2. So khớp mật khẩu */
  const ok =
    hashHex(password) === Buffer.from(user.password_hash).toString('hex');

  if (!ok)
    return { code: 401, msg: 'Vui lòng kiểm tra lại tài khoản và mật khẩu!' };

  /* 3. Lấy khach_hang_id (nếu user là khách) */
  let khachHangId = null;
  if (user.role === 'KhachHang') {
    const rs = await pool.request()
      .input('uid', sql.Int, user.id)
      .query('SELECT id FROM KhachHang WHERE user_id = @uid');
    khachHangId = rs.recordset[0]?.id ?? null;   // có thể null nếu chưa có trigger
  }

  /* 4. Tạo JWT + trả về */
  const token = sign({
    id   : user.id,
    role : user.role,
    username: user.username,
    khachHangId,           // <-- thêm vào payload
  });

  return {
    code : 200,
    data : { token, role: user.role, username: user.username, khachHangId },
  };
}


async function register({ username, password, email, role }) {
  const pool = await poolPromise;

  const dup = await pool.request()
    .input('username', sql.NVarChar, username)
    .input('email',    sql.NVarChar, email)
    .query('SELECT 1 FROM Users WHERE username = @username OR email = @email');

  if (dup.recordset.length) return { code: 409, msg: 'Tài khoản hoặc email đã tồn tại.' };

  await pool.request()
    .input('username',      sql.NVarChar, username)
    .input('password_hash', sql.VarBinary, hashBuffer(password))
    .input('role',          sql.NVarChar, role)
    .input('email',         sql.NVarChar, email)
    .query('INSERT INTO Users (username, password_hash, role, email) VALUES (@username, @password_hash, @role, @email)');

  return { code: 201, data: { message: `Đăng ký ${role === 'NhanVien' ? 'nhân viên' : 'khách hàng'} thành công!` } };
}

async function forgotPassword(email) {
  const pool = await poolPromise;
  const rs   = await pool.request()
     .input('email', sql.NVarChar, email)
     .query('SELECT id, username FROM Users WHERE email = @email');
  const user = rs.recordset[0];
  if (!user)            return { code: 404,  msg: 'Email không tồn tại' };

  // 1. Tạo token + lưu DB
  const token  = crypto.randomBytes(32).toString('hex');
  const expire = dayjs().add(30, 'minutes').toDate();    // 30′
  await pool.request()
     .input('user_id',     sql.Int,        user.id)
     .input('reset_token', sql.NVarChar,   token)
     .input('expires_at',  sql.DateTime,   expire)
     .query(`
        INSERT INTO PasswordResets(user_id, reset_token, expires_at)
        VALUES (@user_id, @reset_token, @expires_at)
     `);

  // 2. Gửi email (demo)
  await sendMail({
     to:  email,
     subject: 'EGA Pets – Đặt lại mật khẩu',
     html: `
       Xin chào ${user.username},<br/>
       Bấm vào đường dẫn sau để đặt lại mật khẩu (có hiệu lực 30 phút):<br/>
       <a href="${process.env.FRONTEND_URL}/reset-password/${token}">
         Đặt lại mật khẩu
       </a>`
  });

  return { code: 200, data: { message: 'Đã gửi email khôi phục mật khẩu!' } };
}

async function resetPassword({ token, newPassword }) {
  const pool = await poolPromise;
  const rs   = await pool.request()
     .input('token', sql.NVarChar, token)
     .query(`
        SELECT user_id, expires_at
        FROM PasswordResets
        WHERE reset_token = @token
     `);
  const row = rs.recordset[0];
  if (!row)                     return { code: 400, msg: 'Token không hợp lệ' };
  if (dayjs().isAfter(row.expires_at))
      return { code: 410, msg: 'Token đã hết hạn' };

  // 1. cập nhật mật khẩu
  await pool.request()
     .input('password_hash', sql.VarBinary, hashBuffer(newPassword))
     .input('user_id',       sql.Int,       row.user_id)
     .query('UPDATE Users SET password_hash = @password_hash WHERE id = @user_id');

  // 2. xoá token
  await pool.request()
     .input('token', sql.NVarChar, token)
     .query('DELETE FROM PasswordResets WHERE reset_token = @token');

  return { code: 200, data: { message: 'Đặt lại mật khẩu thành công!' } };
}

/* ---------------- OTP 6 số ---------------- */
function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 100 000‑999 999
}

async function sendOtp(email, purpose = 'resetPw') {
  const pool = await poolPromise;

  // 1. Tìm user theo email
  const rs = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT id, username FROM Users WHERE email = @email');
  const user = rs.recordset[0];
  if (!user) return { code: 404, msg: 'Email không tồn tại.' };

  // 2. Tạo / cập‑nhật OTP
  const otp    = genOtp();
  const expire = dayjs().add(10, 'minutes').toDate();

  await pool.request()
    .input('user_id',  sql.Int,      user.id)
    .input('purpose',  sql.NVarChar, purpose)
    .input('code',     sql.NVarChar, otp)
    .input('expires',  sql.DateTime, expire)
    .query(`
      MERGE EmailOtp AS tgt
      USING (SELECT @user_id AS user_id, @purpose AS purpose) src
      ON (tgt.user_id = src.user_id AND tgt.purpose = src.purpose)
      WHEN MATCHED THEN UPDATE SET code = @code, expires_at = @expires, used_at = NULL
      WHEN NOT MATCHED THEN INSERT (user_id, purpose, code, expires_at)
           VALUES (@user_id, @purpose, @code, @expires);
    `);

  // 3. Gửi mail
  await sendMail({
    to: email,
    subject: 'Mã OTP – EGA Pets',
    html: `
      Xin chào ${user.username},<br/>
      Mã xác thực của bạn là: <b style="font-size:20px">${otp}</b><br/>
      Mã có hiệu lực 10 phút. Không chia sẻ cho bất kỳ ai!`
  });

  return { code: 200, data: { message: 'Đã gửi OTP qua email!' } };
}

async function verifyOtp({ email, code, purpose = 'resetPw' }) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('email',   sql.NVarChar, email)
    .input('purpose', sql.NVarChar, purpose)
    .query(`
      SELECT e.id, e.code, e.expires_at, e.used_at, u.id AS user_id
      FROM EmailOtp e
      JOIN Users u ON u.id = e.user_id
      WHERE u.email = @email AND e.purpose = @purpose
    `);
  const row = rs.recordset[0];
  if (!row)                  return { code: 400, msg: 'OTP không tồn tại.' };
  if (row.used_at)           return { code: 409, msg: 'OTP đã được sử dụng.' };
  if (dayjs().isAfter(row.expires_at))
                             return { code: 410, msg: 'OTP đã hết hạn.' };
  if (row.code !== code)     return { code: 401, msg: 'OTP sai.' };

  // Đánh dấu đã dùng
  await pool.request()
    .input('id', sql.Int, row.id)
    .query('UPDATE EmailOtp SET used_at = GETDATE() WHERE id = @id');

  return { code: 200, data: { userId: row.user_id, message: 'Xác thực OTP thành công!' } };
}

module.exports = { login, register, forgotPassword, resetPassword, sendOtp, verifyOtp, };
