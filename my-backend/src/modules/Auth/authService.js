const { sql, poolPromise } = require('@shared/db/sql');
const { hashBuffer, hashHex } = require('@shared/security/hash');
const { sign } = require('@shared/jwt');

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

module.exports = { login, register };
