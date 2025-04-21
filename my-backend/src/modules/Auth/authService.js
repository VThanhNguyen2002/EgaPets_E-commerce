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

async function login({ username, password }) {
  const user = await fetchUserByUsername(username);
  if (!user) return { code: 404, msg: 'Tài khoản không tồn tại. Vui lòng đăng ký!' };

  const hashedInput = hashHex(password);
  const storedHash  = Buffer.from(user.password_hash).toString('hex');

  if (hashedInput !== storedHash) return { code: 401, msg: 'Vui lòng kiểm tra lại tài khoản và mật khẩu!' };

  const token = sign({ id: user.id, role: user.role, username: user.username });
  return { code: 200, data: { token, role: user.role, username: user.username } };
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

module.exports = { login, register, forgotPassword, resetPassword };
